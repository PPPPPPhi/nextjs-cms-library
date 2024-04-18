"use client"

import { useAdminContext } from "@nextjs-cms-library/admin-components/index"
import {
    usePathname,
    useParams,
    useSelectedLayoutSegments
} from "next/navigation"
import { useEffect, useState } from "react"
import * as _ from "lodash"

const useNextRouterHook = () => {
    const pathname = usePathname()
    const params = useParams()
    const pathSegments = useSelectedLayoutSegments()
    const { setNextJsRoutePathName } = useAdminContext()

    const constructNextJsPath = (pathS: string[]) => {
        let path = "/admin"

        const segments = _.cloneDeep(pathS)
        const paramsRef = _.cloneDeep(params)

        segments.splice(0, 1)

        const values = Object.values(paramsRef)
        const keys = Object.keys(paramsRef)
        let refIdx = 0

        segments.forEach((l) => {
            if (l === values[refIdx]) {
                path = path.concat(`/[${keys[refIdx]}]`)
                refIdx = refIdx + 1
            } else path = path.concat(`/${l}`)
        })

        return path
    }

    useEffect(() => {
        if (pathSegments && pathSegments.length > 0) {
            const path = constructNextJsPath(pathSegments)
            setNextJsRoutePathName(path)
        }
    }, [pathname])
}

export default useNextRouterHook
