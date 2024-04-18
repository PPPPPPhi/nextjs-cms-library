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
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator
        const { roleId, functionId } = roleFunction

        const roleIds = roleId?.map((l: string) => new Types.ObjectId(l))

        const getFunctions = await FunctionService.getFunctionsById(
            functionId as string[]
        )

        const updateRoleFilter = useQueryOperatorFilter(
            {},
            QueryOperatior.ADDTOSET,
            "functions_lookUp",
            getFunctions
        )

        // @ts-ignore
        const updateRole: Promise<any> = Role.findOneAndUpdate(
            {
                _id: { $in: roleIds }
            },
            updateRoleFilter,
            { new: true }
        )

        const res = forkJoin([updateRole]).pipe(
            switchMap((res: any) => {
                const [role = res[0], user = res[1]] = res

                if (!role || !user?.acknowledged)
                    throw new Error("Error in updating role")

                console.log(`[query] res`, role, user)

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

        console.log(`[role-service] updateAddRoleFunction`, res)

        if (res) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

// update roles.userIds & user.roles
export const updateRemoveRoleFunction = async (
    roleFunction: RoleFunctionUpdateType
) => {
    try {
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator
        const { roleId, functionId } = roleFunction

        const roleIds = roleId?.map((l: string) => new Types.ObjectId(l))

        // @ts-ignore
        const updateRole: Promise<any> = Role.findOneAndUpdate(
            {
                _id: { $in: roleIds }
            },
            {
                $pull: {
                    functions_lookUp: {
                        functionId: { $in: functionId }
                    }
                }
            },
            { new: true }
        )

        const res = forkJoin([updateRole]).pipe(
            switchMap((res: any) => {
                const [role = res[0], user = res[1]] = res

                if (!role || !user?.acknowledged)
                    throw new Error("Error in updating role")

                console.log(`[query] res`, role, user)

                role.updatedAt = role?.updatedAt
                role.updatedBy = operatorName
                role.__history = {
                    event: "Update Role Function",
                    user: operatorId,
                    type: "major",
                    method: "updateRemoveRoleFunction"
                }

                return of(role.save())
            })
        )

        console.log(`[role-service] updateRemoveRoleFunction`, res)

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
        const { id: operatorId, name } = operator

        const res = await getUpdateUserRoleWithHistory(
            QueryOperatior.ADDTOSET,
            { name, id: operatorId },
            userRole
        )

        console.log(`[role-service] updateAddUserRole`, res)

        if (res) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

// update roles.userIds & user.roles
export const updateRemoveUserRole = async (userRole: UserRoleUpdateType) => {
    try {
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const res = await getUpdateUserRoleWithHistory(
            QueryOperatior.PULL,
            { name, id: operatorId },
            userRole
        )

        console.log(`[role-service] updateRemoveUserRole`, res)

        if (res) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}
