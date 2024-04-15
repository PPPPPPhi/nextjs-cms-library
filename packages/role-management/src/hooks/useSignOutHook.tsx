"use client"
import { useCookies } from "react-cookie"

const useSignOutHook = () => {
    const [c, sc, removeCookie] = useCookies(["nextjs-admin-role"])

    const nextAdminSignOut = (cb: () => void) => {
        removeCookie("nextjs-admin-role", { path: "/" })
        cb()
    }

    return { nextAdminSignOut }
}

export default useSignOutHook
