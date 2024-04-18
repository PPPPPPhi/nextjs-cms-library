"use client"

import { useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAdminContext } from "@nextjs-cms-library/admin-components/index"
import { useAdminAuthorizationContext } from "../contexts"
import { getPageAuthorization } from "../maps/RoleFunctionMaps"

const usePageAuthorizationHook = () => {
    const router = useRouter()
    const pathname = usePathname()

    const { nextJsRoutePathName, setModal } = useAdminContext()
    const { role, roleList, setIsAuthorized, setIsAuthorizing } =
        useAdminAuthorizationContext()

    const userFunctionsList = useMemo(() => {
        const roleItem = (roleList ?? []).find((l) => l.roleName === role)
        return roleItem?.functions_lookUp.map((k) => k.functionId) ?? []
    }, [role, roleList])

    const defaultFailPage = useMemo(() => {
        const roleItem = (roleList ?? []).find((l) => l.roleName === role)
        if (roleItem?.sites?.[0] === "*") return "/admin"
        else return `/admin/${roleItem?.sites?.[0]}`
    }, [role, roleList])

    const updateIsNotAuthorized = () => {
        setModal({
            title: "Authorization Error",
            content: (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="text-font-body">
                        Sorry, you dont have the right on visiting this page.
                    </span>
                </div>
            ),
            confirmCTAText: "Back to Authorized Page",
            confirmHandler: () => {
                router.push(defaultFailPage)
            },
            isNoCloseBtn: true
        })
    }

    const checkPathAuthorization = (path: string) => {
        const pageAuthCode = getPageAuthorization(path)
        console.log("pageAuthCheck, pageCode: ", pageAuthCode)
        console.log("pageAuthCheck userFunctionsList:", userFunctionsList)

        if (pageAuthCode === -99) {
            setIsAuthorized(true)
            return
        }

        //@ts-ignore
        const isAuthorized = userFunctionsList.includes(pageAuthCode)
        console.log("pageAuthCheck, isAuthorized: ", isAuthorized)
        setIsAuthorized(isAuthorized)
        if (!isAuthorized) updateIsNotAuthorized()
    }

    useEffect(() => {
        console.log("pageAuthCheck, nextJsRoutePathName: ", nextJsRoutePathName)
        if (nextJsRoutePathName && role)
            checkPathAuthorization(nextJsRoutePathName)
    }, [nextJsRoutePathName, role])

    useEffect(() => {
        console.log("vvvvvvvvvvvv router")

        return () => {
            console.log("vvvvvvvvvvvv router leave")

            setIsAuthorized(false)
        }
    }, [pathname])
}

export default usePageAuthorizationHook
