import connectMongoDB from "../../database/connectMongoDB"
import Role from "../../database/models/role/Role"
import User from "../../database/models/user/User"
import Function from "../../database/models/function/Function"
import {
    getOperator,
    getOperatorId,
    getOperatorInfo
} from "../auth-service/authService"
import { initializeFunction } from "../function-service/FunctionService"
import { Types } from "mongoose"
import {
    getProjectedQuery,
    getUpsertSingleDocumentQuery,
    QueryOperatior,
    useQueryOperatorFilter,
    RoleFunctionUpdateType
} from "../utils"
import {
    UserRoleUpdateType,
    getUpdateUserRoleWithHistory
} from "./roleServiceUtils"
import { AuditService, FunctionService } from ".."
import { firstValueFrom, forkJoin, of, switchMap } from "rxjs"

type roleType = {
    roleName: string
    description: string
    functions: string[]
    sites: string[]
    roleId?: string
}

export const initializeSuperAdminRole = async () => {
    try {
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const functionResp = await initializeFunction()
        if (functionResp.status === 200) {
            const resp = await createRole({
                roleName: "Super Admin",
                description: "Super Admin has all the right",
                functions: functionResp.functionIds as string[],
                sites: ["*"]
            })

            if (resp?.status === 200) {
                const userResp = await updateAddUserRole({
                    userId: [operatorId],
                    roleId: [resp?.roleId]
                })
                if (userResp.status === 200)
                    return { message: "Success", status: 200 }
                else throw new Error("Error happened in assigning functions")
            } else throw new Error("Error happened in creating functions")
        } else throw new Error("Error happened in creating functions")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const createRole = async (role: roleType) => {
    const { roleName, description, functions, sites } = role

    try {
        await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const getSelectedFunctions = await FunctionService.getFunctionsById(
            role?.functions
        )

        const newDocument = {
            roleName,
            description,
            functions_lookUp: getSelectedFunctions,
            sites,
            createdBy: operator,
            updatedBy: operator
        }

        const upsertRole = await getUpsertSingleDocumentQuery(
            QueryOperatior.CREATE,
            {
                name,
                id: operatorId,
                historyData: { method: "createRole", event: "Create Role" }
            },
            Role,
            { roleName: roleName },
            newDocument
        )

        console.log(`[upsert Role] createRole`, upsertRole)

        return {
            message: "Success",
            status: 200,
            roleId: upsertRole?.id
        }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getRoleList = async () => {
    try {
        await connectMongoDB()

        const getRoles = await getProjectedQuery(
            Role,
            { _id: { $exists: true } },
            [],
            [
                "_id",
                "roleName",
                "description",
                "sites",
                "functions_lookUp.functionId",
                "functions_lookUp.name",
                "functions_lookUp.description"
            ]
        )

        console.log(`[getProjectedQuery] getRoles`, JSON.stringify(getRoles))
        return { message: "Success", status: 200, roles: getRoles ?? [] }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const updateRoleById = async (roleId: string, role: roleType) => {
    try {
        const { roleName, sites, functions, description } = role

        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const getSelectedFunctions = await FunctionService.getFunctionsById(
            role?.functions
        )

        const newDocument = {
            roleName,
            sites,
            functions_lookUp: getSelectedFunctions,
            description,
            updatedBy: operator,
            updatedAt: new Date()
        }

        const upsertRole = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name,
                id: operatorId,
                historyData: {
                    method: "updateRoleById",
                    event: "Update Role By Id"
                }
            },
            Role,
            { _id: roleId },
            newDocument
        )

        console.log(`[upsert Role] updateRoleById`, upsertRole)

        if (upsertRole) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

// update roles.userIds & user.roles
export const updateAddRoleFunction = async (
    roleFunction: RoleFunctionUpdateType
) => {
    try {
        const { roleId, roleName, sites, description, functionId } =
            roleFunction

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        console.log(`[updateAddRoleFunction] functionId`, functionId)

        const getFunctions = await FunctionService.getFunctionsById(functionId)

        console.log(`[updateAddRoleFunction] getFunctions`, getFunctions)
        const newDocument = {
            roleId,
            roleName,
            sites: sites,
            functions_lookUp: getFunctions,
            description,
            updatedBy: operatorName,
            updatedAt: new Date()
        }

        // @ts-ignore
        const updateRole: Promise<any> = Role.findOneAndUpdate(
            {
                _id: roleId
            },
            newDocument,
            { new: true, upsert: true }
        )
        const updateRes = forkJoin([updateRole]).pipe(
            switchMap((res: any) => {
                const role = res[0]

                console.log(`[query] res`, role)

                role.updatedAt = role?.updatedAt
                role.updatedBy = operatorName
                role.__history = {
                    event: "Update Role Function",
                    user: operatorId,
                    type: "major",
                    method: "updateAddRoleFunction"
                }

                return of(role.save())
            })
        )

        const res = await firstValueFrom(updateRes)
        console.log(`[role-service] updateAddRoleFunction`, res)

        if (res) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

// update roles.userIds & user.roles
export const updateAddUserRole = async (userRole: UserRoleUpdateType) => {
    try {
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const { userId, roleId } = userRole

        const roleIds = JSON.parse(roleId)?.map(
            (l: string) => new Types.ObjectId(l)
        )

        console.log(`[update role] roleIds`, roleIds)

        // @ts-ignore
        const updateRole: Promise<any> = User.findOneAndUpdate(
            {
                _id: userId
            },
            { roles: roleIds },
            { new: true }
        )
        const updateRes = forkJoin([updateRole]).pipe(
            switchMap((res: any) => {
                const user = res[0]

                console.log(`[query] res`, user)

                user.updatedAt = user?.updatedAt
                user.updatedBy = operatorName
                user.__history = {
                    event: "Update User Role",
                    user: operatorId,
                    type: "major",
                    method: "updateAddUserRole"
                }

                return of(user.save())
            })
        )

        const res = await firstValueFrom(updateRes)

        console.log(`[role-service] updateAddUserRole`, res)

        if (res) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}
