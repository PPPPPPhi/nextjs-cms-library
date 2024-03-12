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
    headerIcon?: React.ReactNode
    cellType: cellComponentType
    cellRef?: string
    size?: number
    actionTitle?: string
    action?: (orignal: any) => void
    isExpandable?: boolean
    isCompatible?: boolean
    customStyle?: React.CSSProperties
    isDisabled?: boolean
}
