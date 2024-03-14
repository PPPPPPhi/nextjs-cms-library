import connectMongoDB from "../../database/connectMongoDB"
import User from "../..//database/models/user/User"
import { getServerAuthSession } from "./auth"
import { ErrorCode } from "../../constants/"

type userType = {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
}

export const authenticateUser = async (account: string, password: string) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const user = await User.findOne({ userName: account })

        if (user) {
            const isValid = await user.isValidPassword(password)
            console.log("sdadas", user)

            const { userName, _id, firstName, lastName, email } = user
            if (isValid)
                return {
                    id: _id,
                    userId: _id,
                    userName,
                    firstName,
                    lastName,
                    email
                }
            else throw new Error(ErrorCode.PASSWORD_NOT_MATCH)
        } else throw new Error(ErrorCode.USER_NOT_FOUND)
    } catch (e) {
        console.log("Error in Authenication", e)
        return null
    }
}

export const getUserAuthProfile = async (userId: string) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const user = await User.findOne({ _id: userId }, "-password")

        if (user) return user
        else throw new Error(ErrorCode.USER_NOT_FOUND)
    } catch (e) {
        console.log("Error in Authenication", e)
        return {}
    }
}

export const checkAccountAvailablility = async (
    userName: string,
    email: string
) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const sameUser = await User.findOne({
            $or: [{ userName: userName }, { email: email }]
        })
        if (sameUser)
            return { message: "Account is already registered", status: 401 }
        else return { message: "Account is ok", status: 401 }
    } catch (e) {
        console.log("Error in checkAccountAvailablility", e)
        return { message: "Error in checkAccountAvailablility", status: 500 }
    }
}

export const getOperator = async (): Promise<string> => {
    const authSession = await getServerAuthSession()
    //@ts-ignore
    return authSession?.user?.userName || "SYSTEM"
}

export const getOperatorId = async (): Promise<string> => {
    const authSession = await getServerAuthSession()
    console.log("authSession", authSession?.user)
    //@ts-ignore
    return authSession?.user?.id || "SYSTEM"
}
