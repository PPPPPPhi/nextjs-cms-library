import connectMongoDB from "@/db-services/database/connectMongoDB"
import { ErrorCode } from "@/db-services/constants/"
import Role from "@/db-services/database/models/role/Role"
import { getOperator } from "../auth-service/authService"
import { initializeFunction } from "../function-service/FunctionService"
import { assingRoleToUser } from "../user-service/UserService"
import { Types } from "mongoose"

type roleType = {
    name: string
    description: string
    functions: string[]
    sites: "*" | string[]
}

export const initializeSuperAdminRole = async () => {
    try {
        const operator = await getOperator()

        const functionResp = await initializeFunction()
        if (functionResp.status === 200) {
            const resp = await createRole({
                name: "Super Admin",
                description: "Super Admin has all the right",
                functions: functionResp.functionIds as string[],
                sites: "*"
            })

            if (resp?.status === 200) {
                const userResp = await assingRoleToUser([resp.roleId], operator)
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
    const { name, description, functions, sites } = role

    try {
        await connectMongoDB()
        const operator = await getOperator()

        const role = new Role({
            name,
            description,
            functions: functions.map((l) => new Types.ObjectId(l)),
            sites,
            createdBy: operator,
            updatedBy: operator
        })

        const roleItem = await role.save()
        return { message: "Success", status: 200, roleId: roleItem._id }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getRoleList = async () => {
    try {
        await connectMongoDB()

        const roles = await Role.aggregate([
            { $unwind: "$functions" },
            {
                $lookup: {
                    from: "functions",
                    localField: "functions",
                    foreignField: "_id",
                    as: "functionItem"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    details: { $push: "$$ROOT" }
                }
            }
        ])

        const reformatted = (roles || []).map((k) => {
            return {
                _id: k._id,
                name: k.details[0].name,
                sites: k.details[0].sites,
                description: k.details[0].description,
                functions: (k.details || []).map(
                    (l: {
                        functionItem: {
                            _id: string
                            name: string
                            description: string
                        }[]
                    }) => {
                        return {
                            functionId: l.functionItem[0]?._id,
                            functionName: l.functionItem[0]?.name,
                            functionDescription: l.functionItem[0]?.description
                        }
                    }
                )
            }
        })

        return { message: "Success", status: 200, roles: reformatted ?? [] }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const updateRoleById = async (roleId: string, role: roleType) => {
    try {
        const { name, sites, functions, description } = role

        const operator = await getOperator()

        const resp = await Role.updateOne(
            { _id: roleId },
            {
                name,
                sites,
                functions: functions.map((l) => new Types.ObjectId(l)),
                description,
                updatedBy: operator
            }
        )

        if (resp.acknowledged) return { status: 200 }
        else throw new Error("Error in updating role")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}
