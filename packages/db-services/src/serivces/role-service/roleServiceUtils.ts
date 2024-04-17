import mongoose, { Model, Types } from "mongoose"
import _ from "lodash"
import Role from "../../database/models/role/Role"
import User from "../../database/models/user/User"
import { firstValueFrom, forkJoin, of, switchMap } from "rxjs"
import { QueryOperatior, useQueryOperatorFilter } from "../utils"

export type UserRoleUpdateType = {
    userId: string
    roleId: string
}

export const getUpdateUserRoleWithHistory = async (
    operation: string,
    operator: { name: string; id: string; reason?: string; historyData?: any },
    userRole: UserRoleUpdateType
) => {
    const { name, id, reason, historyData } = operator
    const { userId, roleId } = userRole

    const userIds = JSON.parse(userId)?.map(
        (l: string) => new Types.ObjectId(l)
    )
    const roleIds = JSON.parse(roleId)?.map(
        (l: string) => new Types.ObjectId(l)
    )

    const updateRoleFilter = useQueryOperatorFilter(
        {},
        operation,
        "userIds",
        userIds
    )

    const updateUserFilter = useQueryOperatorFilter(
        {},
        operation,
        "roles",
        roleIds
    )

    console.log(`[update filter]`, updateRoleFilter, updateUserFilter)
    // @ts-ignore
    const updateRole: Promise<any> = Role.findOneAndUpdate(
        {
            _id: { $in: roleIds }
        },
        updateRoleFilter,
        { new: true }
    )

    const updateUser: Promise<any> = User.updateMany(
        {
            _id: { $in: userIds }
        },
        updateUserFilter
    )
    const query = forkJoin([updateRole, updateUser]).pipe(
        switchMap((res: any) => {
            const [role = res[0], user = res[1]] = res

            if (!role || !user?.acknowledged)
                throw new Error("Error in updating role")

            console.log(`[query] res`, role, user)

            role.updatedAt = role?.updatedAt
            role.updatedBy = name
            role.__history = {
                event: "Update User Role",
                user: id, // An object id of the user that generate the event
                reason: reason ?? undefined,
                data: historyData ?? undefined, // Additional data to save with the event
                type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                method: "updateUserRole" // Optional and intended for method reference
            }

            return of(role.save())
        })
    )

    const res = await firstValueFrom(query)
    return res
}