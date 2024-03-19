export type cellComponentType =
    | "badge"
    | "cell"
    | "date"
    | "action"
    | "edit"
    | "desc"
    | "view"

export type columnDefsType = {
    accessorKey: string
    header: string
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
}
