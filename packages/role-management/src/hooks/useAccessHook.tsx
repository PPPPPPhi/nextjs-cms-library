import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminContext } from "@nextjs-cms-library/admin-components/index"

const useAccessHook = () => {
    const { status } = useSession()

    const nextAuthStatus = useMemo(() => status, [status])

    // const { setAuthLoading } = useAdminContext()
    // const router = useRouter()

    // useEffect(() => {
    //     setAuthLoading(true)
    // }, [])

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push(`${process.env.NEXT_DNS_PATH}/cms/login`)
    //         setAuthLoading(false)
    //     } else if (status === "authenticated") setAuthLoading(false)
    // }, [status])

    return nextAuthStatus
}

export default useAccessHook
