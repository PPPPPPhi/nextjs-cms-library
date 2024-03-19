export type cellComponentType =
    | "badge"
    | "cell"
    | "date"
    | "action"
    | "edit"
    | "desc"
    | "view"
    | "badgeList"

export type columnDefsType = {
    accessorKey: string
    header: string
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
    isExpandable?: boolean
    isCompatible?: boolean
    isClonable?: boolean
    customStyle?: React.CSSProperties
    isDisabled?: boolean
    isActivate?: boolean
}
