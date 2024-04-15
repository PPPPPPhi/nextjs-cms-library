"use client"

import {
    createContext,
    FC,
    useContext,
    useState,
    Dispatch,
    SetStateAction
} from "react"
import { HookWrapper } from "../wrappers/HookWrapper"
import { useSession } from "next-auth/react"
import { roleType, authUserType } from "./type"

interface AdminAuthorizationProps {
    children: any
}

export type AdminAuthorizationContextProps = {
    role: string | undefined
    setRole: Dispatch<SetStateAction<string | undefined>>
    roleList: roleType[]
    setRoleList: Dispatch<SetStateAction<roleType[]>>
    roleFairList: string[]
    setRoleFairList: Dispatch<SetStateAction<string[]>>
    user: authUserType | undefined
    setUser: Dispatch<SetStateAction<authUserType | undefined>>
}

const contextDefaultValues: AdminAuthorizationContextProps = {
    role: "",
    setRole: () => undefined,
    roleList: [],
    setRoleList: () => [],
    roleFairList: [],
    setRoleFairList: () => [],
    user: undefined,
    setUser: () => undefined
}

export const AdminAuthorizationContext =
    createContext<AdminAuthorizationContextProps>(contextDefaultValues)

const AdminAuthorizationContextProvider: FC<AdminAuthorizationProps> = ({
    children
}) => {
    const { data: session, status } = useSession()

    const [role, setRole] = useState<string | undefined>(undefined)
    const [roleList, setRoleList] = useState<any[]>([])
    const [user, setUser] = useState<authUserType | undefined>()
    const [roleFairList, setRoleFairList] = useState<string[]>([])

    console.log("auth context", session, status)

    return (
        <AdminAuthorizationContext.Provider
            value={{
                role,
                setRole,
                roleList,
                setRoleList,
                roleFairList,
                setRoleFairList,
                user,
                setUser
            }}>
            <HookWrapper>{children}</HookWrapper>
        </AdminAuthorizationContext.Provider>
    )
}

export default AdminAuthorizationContextProvider

export function useAdminAuthorizationContext(): AdminAuthorizationContextProps {
    return useContext(AdminAuthorizationContext)
}
