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

type functionType = {
    name: string
    description: string
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
    const { name, description } = f

    try {
        await connectMongoDB()

        const newDocument = {
            name,
            description
        }

        const createRes = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                historyData: {
                    method: "registerUserByForm",
                    event: "Register New User"
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

        const selectedFunctions = functionIds?.map(
            (l: string) => new Types.ObjectId(l)
        )

        const functions = await getProjectedQuery(
            Function,
            { _id: { $in: selectedFunctions } },
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
