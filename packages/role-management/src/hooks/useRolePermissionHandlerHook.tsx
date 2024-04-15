"use client"

import { useAdminAuthorizationContext } from "../contexts"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

const useRolePermissionHandlerHook = () => {
    const { role, roleFairList } = useAdminAuthorizationContext()
    const { site } = useParams()
    const router = useRouter()

    useEffect(() => {
        if (role && roleFairList.length) {
            if (roleFairList.includes("*")) return
            else if (!roleFairList.includes(site as string)) {
                router.push(`/admin/${roleFairList[0]}`)
            }
        }
    }, [role, roleFairList])
}

export default useRolePermissionHandlerHook
