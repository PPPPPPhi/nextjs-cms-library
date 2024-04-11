"use client"

import {
    createContext,
    FC,
    useContext,
    useState,
    Dispatch,
    SetStateAction
} from "react"

export type AdminNavigationContextProps = {
    isCollapsing: boolean
    setIsCollapsing: Dispatch<SetStateAction<boolean>>
    isShowSetting: boolean
    setIsShowSetting: Dispatch<SetStateAction<boolean>>
    isDraggable: boolean
    setIsDraggable: Dispatch<SetStateAction<boolean>>
    osPosition: number
    setOsPosition: Dispatch<SetStateAction<number>>
    osIdRefList: string[]
    setOsIdRefList: Dispatch<SetStateAction<string[]>>
}

interface AdminNavigationProps {
    children: any
}

const contextDefaultValues: AdminNavigationContextProps = {
    isCollapsing: false,
    setIsCollapsing: () => false,
    isShowSetting: true,
    setIsShowSetting: () => true,
    isDraggable: false,
    setIsDraggable: () => false,
    osPosition: -99,
    setOsPosition: () => -99,
    osIdRefList: [],
    setOsIdRefList: () => []
}

export const AdminNavigationContext =
    createContext<AdminNavigationContextProps>(contextDefaultValues)

const AdminNavigationContextProvider: FC<AdminNavigationProps> = ({
    children
}) => {
    const [isCollapsing, setIsCollapsing] = useState<boolean>(false)
    const [isShowSetting, setIsShowSetting] = useState<boolean>(true)
    const [isDraggable, setIsDraggable] = useState<boolean>(false)
    const [osPosition, setOsPosition] = useState<number>(-99)
    const [osIdRefList, setOsIdRefList] = useState<string[]>([])

    return (
        <AdminNavigationContext.Provider
            value={{
                isCollapsing,
                setIsCollapsing,
                isShowSetting,
                setIsShowSetting,
                isDraggable,
                setIsDraggable,
                osPosition,
                setOsPosition,
                osIdRefList,
                setOsIdRefList
            }}>
            {children}
        </AdminNavigationContext.Provider>
    )
}

export default AdminNavigationContextProvider

export function useAdminNavigationContext(): AdminNavigationContextProps {
    return useContext(AdminNavigationContext)
}
