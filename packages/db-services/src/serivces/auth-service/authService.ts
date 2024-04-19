import { Types, ObjectId } from "mongoose"
import connectMongoDB from "../../database/connectMongoDB"
import User from "../..//database/models/user/User"
import Role from "../../database/models/role/Role"
import Audit from "../../database/models/audit/Audit"
import Function from "../../database/models/function/Function"
import { getServerAuthSession } from "./auth"
import { ErrorCode } from "../../constants/"
import _, { merge } from "lodash"
import {
    getMergedQueryRes,
    getPaginatedQuery,
    getProjectedQuery
} from "../utils"
import { forkJoin, switchMap, firstValueFrom, of } from "rxjs"
import { v4 as uuidv4 } from "uuid"

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

            const { userName, _id, firstName, lastName, email } = user
            if (isValid) {
                const userDoc = {
                    id: _id,
                    userId: _id,
                    userName,
                    firstName,
                    lastName,
                    email
                }
                await Audit.insertMany([
                    {
                        dataId: uuidv4(),
                        // @ts-ignore
                        user: _id,
                        category: "users",
                        action: `users login`,
                        details: userDoc
                    }
                ])

                return userDoc
            } else throw new Error(ErrorCode.PASSWORD_NOT_MATCH)
        } else throw new Error(ErrorCode.USER_NOT_FOUND)
    } catch (e) {
        console.log("Error in Authenication", e)
        return null
    }
}

export const getUserAuthProfile = async (userId: string) => {
    try {
        await connectMongoDB()
        console.log(`[getUserAuthProfile] input userId`, userId)

        const userObjId: Types.ObjectId = new Types.ObjectId(userId)
        console.log(`[getUserAuthProfile] input userObjId`, userObjId)

        const user = getProjectedQuery(
            User,
            { _id: { $in: [userObjId] } },
            [],
            [
                "userName",
                "firstName",
                "lastName",
                "email",
                "_id",
                "status",
                "createdAt"
            ]
        )

        const roles = getProjectedQuery(
            Role,
            {
                userIds: { $in: [userObjId] }
            },
            [],
            [
                "roleName",
                "description",
                "sites",
                "functions_lookUp.functionId",
                "functions_lookUp.description"
            ]
        )

        const query = forkJoin([user, roles]).pipe(
            switchMap((res: any) => {
                const [user = res[0], roles = res[1]] = res
                console.log(`[getUserAuthProfile]`, user, roles)
                return of({ primary: user, secondary: roles })
            })
        )
        const res = await firstValueFrom(query)

        const mergedRes = getMergedQueryRes(res)

        console.log(
            `[getUserAuthProfile] user`,
            mergedRes,
            JSON.stringify(mergedRes)
        )
        if (mergedRes) return mergedRes
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
    //@ts-ignore
    return authSession?.user?.id || "SYSTEM"
}

type OperatorInfoType = {
    name: string
    email: string
    image: string
    id: string
}

export const getOperatorInfo = async (): Promise<OperatorInfoType> => {
    const authSession = await getServerAuthSession()
    // @ts-ignore
    const userInfo = authSession?.token?.user

    const { userName, email, image, _id } = userInfo[0]
    // @ts-ignore
    return { name: userName, email, image, id: _id }
}

export const updateUserLogout = async () => {
    try {
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        console.log(`[user] logout`, operatorId)

        await Audit.insertMany([
            {
                dataId: uuidv4(),
                // @ts-ignore
                user: operatorId,
                category: "users",
                action: `users logout`,
                details: {}
            }
        ])

        return { message: "Success", status: 200 }
    } catch (err) {
        console.log(`Error occur:`, err)
        return { message: "Failed", status: 500 }
    }
}
