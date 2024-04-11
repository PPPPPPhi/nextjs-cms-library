"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminContext } from "@nextjs-cms-library/admin-components/index"

const usePageAuthorizationHook = () => {
    const router = useRouter()
    const { nextJsRoutePathName } = useAdminContext()

    useEffect(() => {
        console.log("navType in lib", nextJsRoutePathName)
    }, [router])
}

export default usePageAuthorizationHook
