"use client"

import { useAdminContext } from "@nextjs-cms-library/admin-components/index"
import { useAdminAuthorizationContext } from "@nextjs-cms-library/role-management/index"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

const useRoleHandlerHook = () => {
    const { role } = useAdminAuthorizationContext()
    const { setModal } = useAdminContext()
    const { data: session, status } = useSession()

    const selectRole = () => {
        setModal({
            title: "Role Selection",
            content: <>A</>,
            confirmCTAText: "Sign in",
            confirmHandler: () => {
                JSON.parse("dfewfw")
            }
        })
    }

    useEffect(() => {
        // if (!role) selectRole()
    }, [role])
}

export default useRoleHandlerHook
