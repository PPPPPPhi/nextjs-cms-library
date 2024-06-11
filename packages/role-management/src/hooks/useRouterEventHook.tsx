"use client"

import { useAdminContext } from "@nextjs-cms-library/admin-components/index"
import { usePathname, useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useRouterEventHook = (STATIC_ROUTE_NAV: any) => {
    const pathname = usePathname()
    const params = useParams()
    const router = useRouter()

    const { setNavType, setNextJsRoutePathName } = useAdminContext()

    const [nextJsParam, setNextJsParam] = useState({})
    const [adminNav, setAdminNav] = useState(STATIC_ROUTE_NAV)
    const [nextJsPath, setNextJsPath] = useState("")

    const constructNextJsPathTable = () => {
        let adminNavObj = { ...adminNav }

        Object.keys(params).forEach((l) => {
            const regEx = new RegExp(`\\[${l}\\]`, "g")

            Object.keys(STATIC_ROUTE_NAV).forEach((j) => {
                adminNavObj = {
                    ...adminNavObj,
                    // @ts-ignore
                    [j.replace(regEx, params[l])]: STATIC_ROUTE_NAV[j]
                }
            })
        })
        setAdminNav(adminNavObj)
    }

    const checkingNextJsParam = (params: any) => {
        if (Object.keys(params).length === 0) return false
        else {
            let pathParams = { ...nextJsParam }
            let isUpdated = false

            Object.keys(params).forEach((k: string) => {
                // @ts-ignore
                if (pathParams[k] === params[k]) return
                else {
                    pathParams = { ...pathParams, [k]: params[k] }
                    isUpdated = true
                }
            })

            if (isUpdated) {
                setNextJsParam(pathParams)
            }

            return isUpdated
        }
    }

    const constructNextJsPath = () => {
        setNextJsPath(pathname)
    }

    useEffect(() => {
        constructNextJsPath()
    }, [adminNav])

    useEffect(() => {
        constructNextJsPathTable()
    }, [nextJsParam])

    useEffect(() => {
        if (nextJsPath) {
            setNavType(adminNav[nextJsPath])
        }
    }, [nextJsPath])

    useEffect(() => {
        const isUpdated = checkingNextJsParam(params)
        if (!isUpdated) constructNextJsPath()
    }, [pathname, params])
}

export default useRouterEventHook
