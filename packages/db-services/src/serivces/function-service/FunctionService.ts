import { Model } from "mongoose"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { getOperatorInfo } from "../auth-service/authService"
import { connectMongoDB } from "../.."

type functionType = {
    name: string
    description: string
    functionId: number
}

export const initializeFunction = async () => {
    try {
        const mongoose = await connectMongoDB()
        const defaultFunctions = RoleFunction.role

        //@ts-ignore
        const functions = await (
            mongoose.models.Function as Model<any, {}, {}, {}, any, any>
        ).insertMany(defaultFunctions)
        return {
            message: "Success",
            status: 200,
            functionIds: functions.map((l) => l._id)
        }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

export const createFunction = async (f: functionType) => {
    const { name, description, functionId } = f

    try {
        const mongoose = await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const newDocument = {
            name,
            description,
            functionId
        }

        const createRes = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "createFunction",
                    event: "Create New Function"
                }
            },
            mongoose.models.Function as Model<any, {}, {}, {}, any, any>,
            { name: name },
            newDocument
        )

        if (createRes) return { message: "Success", status: 200 }
        else throw new Error("Error in register new user")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

export const getAllFunctions = async () => {
    try {
        const mongoose = await connectMongoDB()

        //@ts-ignore
        const functions = (
            mongoose.models.Function as Model<any, {}, {}, {}, any, any>
        ).find({}, "-updatedAt -updatedAt")
        if (functions) return functions
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getFunctionsById = async (functionIds: number[] | string[]) => {
    try {
        const mongoose = await connectMongoDB()

        const functions = await getProjectedQuery(
            mongoose.models.Function as Model<any, {}, {}, {}, any, any>,
            { functionId: { $in: functionIds } },
            [],
            [
                "_id",
                "name",
                "description",
                "__v",
                "createdAt",
                "updatedAt",
                "functionId"
            ]
        )

        if (functions) return functions
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}
