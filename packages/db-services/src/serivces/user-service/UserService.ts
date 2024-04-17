import connectMongoDB from "../../database/connectMongoDB"
import User from "../../database/models/user/User"
import {
    checkAccountAvailablility,
    getOperator,
    getOperatorId
} from "../auth-service/authService"
import { ErrorCode } from "../../constants/"
import { Types } from "mongoose"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"

export type userRegType = {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
}

export const registerUserByForm = async (user: userRegType) => {
    const { userName, firstName, lastName, email, password } = user

    try {
        await connectMongoDB()
        const operator = await getOperator()
        const operatorId = await getOperatorId()

        const checkAccountResp = await checkAccountAvailablility(
            userName,
            email
        )
        if (checkAccountResp.status === 400 || checkAccountResp.status === 401)
            throw new Error(checkAccountResp.message)

        const newDocument = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            roles: [],
            password: password,
            avator: "",
            status: 1,
            createdBy: userName,
            updatedBy: userName
        }

        const createUser = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operator,
                id: operatorId,
                historyData: {
                    method: "registerUserByForm",
                    event: "Register New User"
                }
            },
            User,
            { userName: userName },
            newDocument
        )

        console.log(`[upsert Role] updateRoleById`, createUser)

        if (createUser) return { status: 200 }
        else throw new Error("Error in register new user")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getUserProfile = async (userName: string) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const user = await User.findOne({ userName: userName }, "-password")

        if (user) return user
        else throw new Error(ErrorCode.USER_NOT_FOUND)
    } catch (e) {
        console.log("Error in Authenication", e)
        return {}
    }
}

export const updateUserProfile = async (
    userName: string,
    firstName: string,
    lastName: string
) => {
    try {
        await connectMongoDB()
        const user = await User.updateOne(
            { userName },
            {
                firstName,
                lastName
            }
        )
        if (user.acknowledged) return 200
        else throw new Error("Error in updating profile")
    } catch (e) {
        console.log("Error in updating profile", e)
        return 500
    }
}

export const getUserList = async () => {
    try {
        await connectMongoDB()

        const users = await getProjectedQuery(
            User,
            { _id: { $exists: true } },
            [
                {
                    $lookup: {
                        from: "roles",
                        localField: "roles",
                        foreignField: "_id",
                        as: "roleItem"
                    }
                }
            ],
            [
                "userName",
                "firstName",
                "lastName",
                "email",
                "roles",
                "avator",
                "status",
                "updatedBy",
                "updatedAt",
                "roleItem"
            ],
            [{ from: "roleItem.roleName", to: "roleItem.name" }]
        )

        console.log(`[userlist] users`, users)

        return users
    } catch (error) {
        console.log("Error Occured", error)
        return { message: "Failed", status: 500 }
    }
}

export const activateUser = async (userName: string, status: number) => {
    try {
        await connectMongoDB()
        const operator = await getOperator()

        const user = await User.updateOne(
            { userName },
            {
                status,
                updatedBy: operator
            }
        )
        if (user.acknowledged) return { status: 200 }
        else throw new Error("Error in activate user")
    } catch (e) {
        console.log("Error in activate user", e)
        return { status: 500 }
    }
}

export const updateUser = async (
    userName: string,
    user: {
        firstName: string
        lastName: string
        roles: string[]
    }
) => {
    try {
        await connectMongoDB()
        const operator = await getOperator()

        const userResp = await User.updateOne(
            { userName },
            {
                ...user,
                roles: user?.roles?.map((l) => new Types.ObjectId(l)),
                updatedBy: operator
            }
        )
        if (userResp.acknowledged) return { status: 200 }
        else throw new Error("Error in activate user")
    } catch (e) {
        console.log("Error in activate user", e)
        return { status: 500 }
    }
}
