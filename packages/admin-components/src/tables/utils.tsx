import { CSSProperties, Dispatch, SetStateAction } from "react"
import { Column } from "@tanstack/react-table"
import {
    AdminTableBadge,
    AdminTableDateCell,
    AdminTableHeaderCell,
    AdminTableRowCell,
    AdminTableActionButton,
    AdminTableEditButton,
    AdminTableCollapse,
    AdminTableDescRowCell,
    AdminTableViewButton,
    AdminTableBadgeList,
    AdminTablePreviewPhoto,
    AdminTableBooleanButton,
    AdminTableRawEditButton,
    AdminTableActionWarnButton,
    AdminTableBooleanBoxCheck
} from "./components"
import { CellContext } from "@tanstack/react-table"
import { columnDefsType, cellComponentType } from "../types/type"

export const getCommonPinningStyles = (
    column: Column<any>,
    type: "th" | "td",
    zebra = false
): CSSProperties => {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn =
        isPinned === "left" && column.getIsLastColumn("left")
    return {
        boxShadow: isLastLeftPinnedColumn
            ? "-4px 0 4px -4px gray inset"
            : undefined,
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        opacity: isPinned ? 1 : 1,
        position: isPinned ? "sticky" : "relative",
        width: column.columnDef.enableResizing ? "auto" : column.getSize(),
        minWidth: column.columnDef.enableResizing ? 120 : "none",
        zIndex: isPinned ? 10 : 0,
        padding: 0,
        minHeight: 35,
        background: "white"
    }
}

export const getCellComponents: any = (cellType: cellComponentType) => {
    let Component
    switch (cellType) {
        case "badge":
            Component = AdminTableBadge
            break
        case "cell":
            Component = AdminTableRowCell
            break
        case "date":
            Component = AdminTableDateCell
            break
        case "action":
            Component = AdminTableActionButton
            break
        case "warnAction":
            Component = AdminTableActionWarnButton
            break
        case "edit":
            Component = AdminTableEditButton
            break
        case "editRaw":
            Component = AdminTableRawEditButton
            break
        case "desc":
            Component = AdminTableDescRowCell
            break
        case "view":
            Component = AdminTableViewButton
            break
        case "badgeList":
            Component = AdminTableBadgeList
            break
        case "photo":
            Component = AdminTablePreviewPhoto
            break
        case "boolean":
            Component = AdminTableBooleanButton
            break
        case "booleanBox":
            Component = AdminTableBooleanBoxCheck
            break
        default:
            Component = AdminTableRowCell
            break
    }
    return Component
}

const getCompareModeLabel = (
    mode: "NONE" | "WITH" | "COMPARE" | "COMPARING"
) => {
    let label
    switch (mode) {
        case "NONE":
            label = ""
            break
        case "WITH":
            label = "With"
            break
        case "COMPARE":
            label = "Compare"
            break
        case "COMPARING":
            label = "Compare"
            break
        default:
            label = ""
            break
    }
    return label
}

const getCloneModelLabel = (mode: "BY" | "CLONE" | "CLONNING") => {
    let label
    switch (mode) {
        case "BY":
            label = "By"
            break
        case "CLONE":
            label = "Clone"
            break
        case "CLONNING":
            label = "Clone"
            break
        default:
            label = ""
            break
    }
    return label
}

const getCompareMode = (ver: number, compareSource: number) => {
    if (compareSource === -1) return "COMPARE"
    else if (compareSource !== -1 && compareSource === ver) return "COMPARING"
    else if (compareSource < ver) return "WITH"
    else return "NONE"
}

const getCloneMode = (
    original: any,
    ver: number,
    compareSource: number,
    cSlug: string
) => {
    if (original.details) return ""

    if (compareSource === -1 && original.slug !== cSlug && !original._id)
        return "CLONE"
    else if (
        compareSource !== -1 &&
        compareSource === ver &&
        original.slug === cSlug
    )
        return "CLONNING"
    else if (original._id && original.slug === cSlug) return "BY"
    else return ""
}

const getActionTitle = (
    _id: string,
    actionTitle: string,
    isInverse: boolean,
    isParent: boolean
) => {
    if (isParent) return ""
    return actionTitle
    // return _id ? (isInverse ? "" : actionTitle) : isInverse ? actionTitle : ""
}

const getTDTitle = (col: columnDefsType, original: any, mode: string) => {
    if (col.isCompatible)
        return getCompareModeLabel(mode as "NONE" | "WITH" | "COMPARE")
    else if (col.isClonable)
        return getCloneModelLabel(mode as "BY" | "CLONE" | "CLONNING")
    else if (col.isActivate)
        return mode === "A" ? col.actionTitle : col.actionInverseTitle
    else {
        return getActionTitle(
            original._id,
            col.actionTitle ?? "",
            col.inverseAction ?? false,
            original.details
        )
    }
}

const getMode = (
    original: any,
    col: columnDefsType,
    rowIdx: number,
    source?: number,
    extension?: {
        cloneSlug?: string
    }
) => {
    if (col.isCompatible) return getCompareMode(rowIdx, source as number)
    else if (col.isClonable)
        return getCloneMode(
            original,
            rowIdx,
            source as number,
            extension?.cloneSlug as string
        )
    else if (col.isActivate) {
        if (original.status === 0) return "A"
        else if (original.status === 1) return "I"
    } else return ""
}

export const getColumnDefinition = (
    columnDefs: columnDefsType[],
    isCompatibleMode?: boolean,
    compareTools?: {
        compareSource: number
        setCompareSource: Dispatch<SetStateAction<number>>
        setCompareTarget: Dispatch<SetStateAction<number>>
    },
    cloneTools?: {
        cloneSource: number
        setCloneSource: Dispatch<SetStateAction<number>>
        setCloneTarget: Dispatch<SetStateAction<number>>
        cloneSlug: string
        setCloneSlug: Dispatch<SetStateAction<string>>
    }
) => {
    const columns = columnDefs.map((k) => {
        return {
            accessorKey: k.accessorKey,
            header: () => (
                <AdminTableHeaderCell label={k.header} customWidth={k.size} />
            ),
            cell: (r: CellContext<any, any>) => {
                const { row, getValue } = r
                const original = row.original ?? {}
                const Component = getCellComponents(k.cellType)

                const rowIdx = row.index

                const source = k.isCompatible
                    ? compareTools?.compareSource
                    : k.isClonable
                      ? cloneTools?.cloneSource
                      : undefined
                const mode = getMode(original, k, rowIdx, source, {
                    cloneSlug: cloneTools?.cloneSlug
                })

                if (k.isExpandable)
                    return (
                        <div>
                            {row.getCanExpand() ? (
                                <AdminTableCollapse
                                    value={`/${getValue()}`}
                                    isExpanded={row.getIsExpanded()}
                                    action={row.getToggleExpandedHandler()}
                                />
                            ) : !k.shouldShow || k.shouldShow(original) ? (
                                <Component
                                    icon={k.headerIcon}
                                    label={getActionTitle(
                                        original._id,
                                        k.actionTitle ?? "",
                                        k.inverseAction ?? false,
                                        original.details
                                    )}
                                    value={`/${getValue()}`}
                                    customWidth={k.size ?? null}
                                    action={() => {
                                        k.action && k.action(original)
                                    }}
                                    authCode={k.authCode}
                                    disabled={k.isDisabled && !original._id}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    )

                return (
                    <>
                        {((isCompatibleMode && k.isCompatible) ||
                            !k.isCompatible) &&
                            (!k.shouldShow || k.shouldShow(original)) && (
                                <Component
                                    icon={k.headerIcon}
                                    label={getTDTitle(
                                        k,
                                        original,
                                        mode as string
                                    )}
                                    value={
                                        k.cellRef
                                            ? original[k.cellRef]
                                            : getValue()
                                    }
                                    badgeTitle={k.badgeTitle}
                                    customWidth={k.size ?? null}
                                    customStyle={k.customStyle}
                                    action={() => {
                                        if (k.isCompatible && compareTools) {
                                            if (mode === "COMPARE")
                                                compareTools.setCompareSource(
                                                    rowIdx
                                                )
                                            else if (mode === "COMPARING") {
                                                compareTools.setCompareSource(
                                                    -1
                                                )
                                                compareTools.setCompareTarget(
                                                    -1
                                                )
                                            } else
                                                compareTools.setCompareTarget(
                                                    rowIdx
                                                )
                                        } else if (k.isClonable && cloneTools) {
                                            if (mode === "CLONE") {
                                                cloneTools.setCloneSource(
                                                    rowIdx
                                                )
                                                cloneTools.setCloneSlug(
                                                    original.slug
                                                )
                                            } else if (mode === "CLONNING") {
                                                cloneTools.setCloneSource(-1)
                                                cloneTools.setCloneTarget(-1)
                                                cloneTools.setCloneSlug("")
                                            } else {
                                                k.action &&
                                                    k.action({
                                                        ...original,
                                                        refLangIdx:
                                                            cloneTools.cloneSource
                                                    })
                                                cloneTools.setCloneSource(-1)
                                                cloneTools.setCloneTarget(-1)
                                                cloneTools.setCloneSlug("")
                                            }
                                        } else k.action && k.action(original)
                                    }}
                                    authCode={k.authCode}
                                    disabled={k.isDisabled && !original._id}
                                />
                            )}
                    </>
                )
            },
            size: k.size ?? undefined,
            enableResizing: k.enableResize,
            minWidth: k.size ?? "none",
            maxWidth: k.size ?? "none"
        }
    })

    return columns
}
