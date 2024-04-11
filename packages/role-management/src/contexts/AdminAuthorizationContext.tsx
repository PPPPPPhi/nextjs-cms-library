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

interface AdminAuthorizationProps {
    children: any
}

export type AdminAuthorizationContextProps = {
    role: string | undefined
    setRole: Dispatch<SetStateAction<string | undefined>>
    roleList: any[]
    setRoleList: Dispatch<SetStateAction<any[]>>
}

const contextDefaultValues: AdminAuthorizationContextProps = {
    role: "",
    setRole: () => undefined,
    roleList: [],
    setRoleList: () => []
}

export const AdminAuthorizationContext =
    createContext<AdminAuthorizationContextProps>(contextDefaultValues)

const AdminAuthorizationContextProvider: FC<AdminAuthorizationProps> = ({
    children
}) => {
    const { data: session, status } = useSession()

    const [role, setRole] = useState<string | undefined>(undefined)
    const [roleList, setRoleList] = useState<any[]>([])

    console.log("auth context", session, status)

    return (
        <AdminAuthorizationContext.Provider
            value={{
                role,
                setRole,
                roleList,
                setRoleList
            }}>
            <HookWrapper>{children}</HookWrapper>
        </AdminAuthorizationContext.Provider>
    )
}

export default AdminAuthorizationContextProvider

export function useAdminAuthorizationContext(): AdminAuthorizationContextProps {
    return useContext(AdminAuthorizationContext)
}
