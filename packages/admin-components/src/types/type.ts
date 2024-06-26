import {
    ACTION_TYPE,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"

export type cellComponentType =
    | "badge"
    | "cell"
    | "date"
    | "action"
    | "warnAction"
    | "edit"
    | "editRaw"
    | "desc"
    | "view"
    | "badgeList"
    | "photo"
    | "boolean"
    | "booleanBox"

export type columnDefsType = {
    accessorKey: string
    header: string
    authCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
    actionInverseTitle?: string
    badgeRef?: any
    badgeTitle?: any
    inverseAction?: boolean
    headerIcon?: React.ReactNode
    cellType: cellComponentType
    cellRef?: string
    size?: number
    actionTitle?: string
    action?: (orignal: any) => void
    shouldShow?: (orignal: any) => boolean
    isExpandable?: boolean
    isCompatible?: boolean
    isClonable?: boolean
    customStyle?: React.CSSProperties
    isDisabled?: boolean
    isActivate?: boolean
    enableResize?: true
    collapseEdit?: (orignal: any) => void
    collapseRemove?: (orignal: any) => void
}
