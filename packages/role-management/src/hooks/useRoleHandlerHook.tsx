"use client"

import { useAdminContext } from "@nextjs-cms-library/admin-components/index"
import { useAdminAuthorizationContext } from "@nextjs-cms-library/role-management/index"
import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { roleType } from "../contexts/type"
import { AdminRoleSwitchingForm } from "@nextjs-cms-library/admin-components/index"
import * as _ from "lodash"
import { useCookies } from "react-cookie"

const useRoleHandlerHook = () => {
    const {
        role,
        setRoleList,
        roleList,
        setRoleFairList,
        setRoleFunctionList,
        setRole,
        setUser
    } = useAdminAuthorizationContext()
    const [cookies, setCookie, removeCookie] = useCookies(["nextjs-admin-role"])

    const { setModal } = useAdminContext()
    const { site } = useParams()

    const { data: session, status } = useSession()
    const { user } = session ?? {}

    const roleRef = useRef<string>()

    const selectRole = () => {
        setModal({
            title: "Role Selection",
            content: (
                <AdminRoleSwitchingForm
                    onFormValueChange={(v) => {
                        roleRef.current = v
                    }}
                />
            ),
            confirmCTAText: "Sign in",
            confirmHandler: () => {
                setRole(roleRef.current)
            },
            isNoCloseBtn: true,
            pannelWidth: 75,
            pannelHeight: 75
        })
    }

    useEffect(() => {
        // @ts-ignore
        if (user && user?.length) {
            const orderedList = _.sortBy(user, ["sites"], ["desc"])
            // @ts-ignore
            setUser(user?.[0])

            // @ts-ignore
            setRoleList(orderedList as roleType[])
        }
    }, [user])

    const setPreSelectedRole = (preRole: string) => {
        const roleSelected = roleList.find((l) => l.roleName === preRole)
        if (roleSelected) {
            setRole(preRole)
            setRoleFairList(roleSelected.sites)
            setRoleFunctionList(
                roleSelected.functions_lookUp.map((l) => l.functionId)
            )
            return true
        }
        return false
    }

    useEffect(() => {
        if (!role) {
            if (cookies["nextjs-admin-role"]) {
                setPreSelectedRole(cookies["nextjs-admin-role"])
                return
            }
            selectRole()
            setRoleFairList([])
            setRoleFunctionList([])
        } else if (role) {
            const isSettled = setPreSelectedRole(role)
            if (isSettled)
                setCookie("nextjs-admin-role", role, {
                    sameSite: "lax",
                    path: "/"
                })
        }
    }, [role, roleList])

    useEffect(() => {}, [site])
}

export default useRoleHandlerHook
