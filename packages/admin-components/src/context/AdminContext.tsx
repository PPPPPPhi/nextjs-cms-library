import React, {
    createContext,
    FC,
    useContext,
    useState,
    Dispatch,
    SetStateAction
} from "react"
import { adminModalType, adminToastType, pageInfoType } from "./type"
import { AdminAuthorizationContextProvider } from "@nextjs-cms-library/role-management/index"

interface ProviderProps {
    children: any
}

export type AdminContextProps = {
    modal: adminModalType | null
    setModal: Dispatch<SetStateAction<adminModalType | null>>
    toast: adminToastType | null
    setToast: Dispatch<SetStateAction<adminToastType | null>>
    authLoading: boolean
    setAuthLoading: Dispatch<SetStateAction<boolean>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    navType: string
    setNavType: Dispatch<SetStateAction<string>>
    nextJsRoutePathName: string
    setNextJsRoutePathName: Dispatch<SetStateAction<string>>
    langLst: string[]
    setLangLst: Dispatch<SetStateAction<string[]>>
    pageInfo: pageInfoType
    setPageInfo: Dispatch<SetStateAction<pageInfoType>>
}

const contextDefaultValues: AdminContextProps = {
    modal: null,
    setModal: () => null,
    toast: null,
    setToast: () => null,
    loading: false,
    setLoading: () => null,
    navType: "setting",
    setNavType: () => null,
    nextJsRoutePathName: "",
    setNextJsRoutePathName: () => "",
    langLst: [],
    setLangLst: () => [],
    authLoading: false,
    setAuthLoading: () => null,
    pageInfo: { name: "", description: "", slug: "", language: "" },
    setPageInfo: () => null
}

export const AdminContext =
    createContext<AdminContextProps>(contextDefaultValues)

const AdminContextProvider: FC<ProviderProps> = ({ children }) => {
    const [modal, setModal] = useState<adminModalType | null>(null)
    const [toast, setToast] = useState<adminToastType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [authLoading, setAuthLoading] = useState<boolean>(false)
    const [navType, setNavType] = useState<string>("setting")
    const [nextJsRoutePathName, setNextJsRoutePathName] = useState<string>("")
    const [langLst, setLangLst] = useState<string[]>([])
    const [pageInfo, setPageInfo] = useState<pageInfoType>({
        name: "",
        description: "",
        slug: "",
        language: ""
    })

    return (
        <AdminContext.Provider
            value={{
                modal,
                setModal,
                toast,
                setToast,
                loading,
                setLoading,
                authLoading,
                setAuthLoading,
                navType,
                setNavType,
                nextJsRoutePathName,
                setNextJsRoutePathName,
                langLst,
                setLangLst,
                pageInfo,
                setPageInfo
            }}>
            <AdminAuthorizationContextProvider>
                {children}
            </AdminAuthorizationContextProvider>
        </AdminContext.Provider>
    )
}
export default AdminContextProvider

export function useAdminContext(): AdminContextProps {
    return useContext(AdminContext)
}
