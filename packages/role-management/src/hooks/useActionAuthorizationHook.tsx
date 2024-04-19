"use client"

import { useMemo } from "react"
import { getActionAuthorization } from "../maps/RoleFunctionMaps"
import { ACTION_TYPE, VIEW_TYPE } from "../constants/Functions"
import { useAdminAuthorizationContext } from "../contexts"

const useActionAuthorization = (
    action?: keyof ACTION_TYPE | keyof VIEW_TYPE
) => {
    const { role, roleList } = useAdminAuthorizationContext()

    const userFunctionsList = useMemo(() => {
        const roleItem = (roleList ?? []).find((l) => l.roleName === role)
        return roleItem?.functions_lookUp.map((k) => k.functionId) ?? []
    }, [role, roleList])

    const checkAuthorization = (ac: keyof ACTION_TYPE) => {
        const actionAuthCode = getActionAuthorization(ac)
        if (actionAuthCode === -99) return true
        else {
            //@ts-ignore
            const isAuthorized = userFunctionsList.includes(actionAuthCode)
            return isAuthorized
        }
    }

    const isAuthorized = useMemo(() => {
        if (!action) return true
        return checkAuthorization(action)
    }, [action])

    return {
        isAuthorized
    }
}

export default useActionAuthorization
