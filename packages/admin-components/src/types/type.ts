import { ACTION_TYPE } from "@nextjs-cms-library/role-management/index"

export type cellComponentType =
    | "badge"
    | "cell"
    | "date"
    | "action"
    | "edit"
    | "desc"
    | "view"
    | "badgeList"
    | "photo"

export type columnDefsType = {
    accessorKey: string
    header: string
    authCode?: keyof ACTION_TYPE
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
}
