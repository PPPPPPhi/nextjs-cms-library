import { Types } from "mongoose"
import connectMongoDB from "../../database/connectMongoDB"
import Function from "../../database/models/function/Function"
import functionModal from "../../database/models/function/Function"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import {
    getOperator,
    getOperatorId,
    getOperatorInfo
} from "../auth-service/authService"

type functionType = {
    name: string
    description: string
    functionId: number
}

export const initializeFunction = async () => {
    try {
        await connectMongoDB()
        const defaultFunctions = RoleFunction.role

        //@ts-ignore
        const functions = await Function.insertMany(defaultFunctions)
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
        await connectMongoDB()

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
            Function,
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
        await connectMongoDB()

        //@ts-ignore
        const functions = Function.find({}, "-updatedAt -updatedAt")
        if (functions) return functions
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getFunctionsById = async (functionIds: string[]) => {
    try {
        await connectMongoDB()

        const functions = await getProjectedQuery(
            Function,
            { functionIds: { $in: functionIds } },
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
