"use client"
import { useState, useEffect } from "react"
import { useAdminAuthorizationContext } from "@nextjs-cms-library/role-management/index"

const usePageCheckAuthorizationHook = () => {
    const { isAuthorized } = useAdminAuthorizationContext()

    const [isAuthorizedPage, setIsAuthorizedPage] = useState(false)
    const [isAuthorizing, setIsAuthorizing] = useState(true)

    useEffect(() => {
        if (isAuthorized && !isAuthorizing) {
            setIsAuthorizedPage(true)
        }

        setIsAuthorizing(false)
    }, [isAuthorized])

    return { isAuthorizedPage }
}

export default usePageCheckAuthorizationHook
