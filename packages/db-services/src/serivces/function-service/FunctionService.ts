import connectMongoDB from "@/db-services/database/connectMongoDB"
import Function from "@/db-services/database/models/function/Function"
import { ErrorCode } from "@/db-services/constants/"
import functionModal from "@/db-services/database/models/function/Function"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { IFunction } from "@/db-services/database"

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

        const func = new functionModal({
            name,
            description
        })

        await func.save()
        return { message: "Success", status: 200 }
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
