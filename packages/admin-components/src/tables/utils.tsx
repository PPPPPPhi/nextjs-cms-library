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
    AdminTableViewButton
} from "./components"
import { CellContext } from "@tanstack/react-table"
import { columnDefsType, cellComponentType } from "../types/type"

export const getCommonPinningStyles = (
    column: Column<any>,
    type: "th" | "td"
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
        width: column.getSize() ?? "auto",
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
        case "edit":
            Component = AdminTableEditButton
            break
        case "desc":
            Component = AdminTableDescRowCell
            break
        case "view":
            Component = AdminTableViewButton
            break
        default:
            Component = AdminTableRowCell
            break
    }
    return Component
}

const getModeLabel = (mode: "NONE" | "WITH" | "COMPARE" | "COMPARING") => {
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

const getCompareMode = (ver: number, compareSource: number) => {
    if (compareSource === -1) return "COMPARE"
    else if (compareSource !== -1 && compareSource === ver) return "COMPARING"
    else if (compareSource < ver) return "WITH"
    else return "NONE"
}

export const getColumnDefinition = (
    columnDefs: columnDefsType[],
    isCompatibleMode?: boolean,
    compareTools?: {
        compareSource: number
        setCompareSource: Dispatch<SetStateAction<number>>
        setCompareTarget: Dispatch<SetStateAction<number>>
    }
) => {
    const columns = columnDefs.map((k) => {
        return {
            accessorKey: k.accessorKey,
            header: () => <AdminTableHeaderCell label={k.header} />,
            cell: (r: CellContext<any, any>) => {
                const { row, getValue } = r
                const original = row.original ?? {}
                const Component = getCellComponents(k.cellType)

                const rowIdx = row.index
                const mode = k.isCompatible
                    ? getCompareMode(rowIdx, compareTools?.compareSource ?? -1)
                    : ""

                if (k.isExpandable)
                    return (
                        <div>
                            {row.getCanExpand() ? (
                                <AdminTableCollapse
                                    value={`/${getValue()}`}
                                    isExpanded={row.getIsExpanded()}
                                    action={row.getToggleExpandedHandler()}
                                />
                            ) : (
                                <Component
                                    icon={k.headerIcon}
                                    label={original._id ? k.actionTitle : ""}
                                    value={`/${getValue()}`}
                                    customWidth={k.size ?? null}
                                    action={() => {
                                        k.action && k.action(original)
                                    }}
                                    disabled={k.isDisabled && !original._id}
                                />
                            )}
                        </div>
                    )

                return (
                    <>
                        {((isCompatibleMode && k.isCompatible) ||
                            !k.isCompatible) && (
                            <Component
                                icon={k.headerIcon}
                                label={
                                    k.isCompatible
                                        ? getModeLabel(
                                              mode as
                                                  | "NONE"
                                                  | "WITH"
                                                  | "COMPARE"
                                          )
                                        : original._id
                                          ? k.actionTitle
                                          : ""
                                }
                                value={
                                    k.cellRef ? original[k.cellRef] : getValue()
                                }
                                customWidth={k.size ?? null}
                                customStyle={k.customStyle}
                                action={() => {
                                    if (k.isCompatible && compareTools) {
                                        if (mode === "COMPARE")
                                            compareTools.setCompareSource(
                                                rowIdx
                                            )
                                        else if (mode === "COMPARING") {
                                            compareTools.setCompareSource(-1)
                                            compareTools.setCompareTarget(-1)
                                        } else
                                            compareTools.setCompareTarget(
                                                rowIdx
                                            )
                                    } else k.action && k.action(original)
                                }}
                                disabled={k.isDisabled && !original._id}
                            />
                        )}
                    </>
                )
            },
            size: k.size ?? undefined
        }
    })

    return columns
}
