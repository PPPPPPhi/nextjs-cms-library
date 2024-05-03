import { useMemo, useState, Fragment, useEffect } from "react"
import {
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
    Row
} from "@tanstack/react-table"
import { getColumnDefinition, getCommonPinningStyles } from "./utils"
import { HiOutlineArrowPath } from "react-icons/hi2"
import { columnDefsType } from "../types/type"
import { AdminDiffViewer } from "./AdminDiffViewer"
import { AdminTablePagination } from "./components/AdminTablePagination"
import { AdminButton } from "../core"
import { getCsvBlob } from "tanstack-table-export-to-csv"
import FileSaver from "file-saver"
import { AdminCard } from "../core/AdminCard"
import {
    ACTION_TYPE,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
import generateExcel from "zipcelx"

interface AdminTableInterface {
    data: any[]
    pinColumns: string[]
    columnDefs: columnDefsType[]
    compareField?: string
    isCompatible?: boolean
    isSubComponent?: boolean
    zebra?: boolean
    exportAuthCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
    tableMinHeight?: number
    excludeExport?: boolean
    isRefresh?: boolean
    getData?: () => void
}

export const AdminTable: React.FC<AdminTableInterface> = ({
    data,
    pinColumns,
    columnDefs,
    compareField,
    isCompatible,
    isSubComponent,
    zebra = false,
    exportAuthCode,
    tableMinHeight = 400,
    excludeExport,
    isRefresh,
    getData
}) => {
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const [compareSource, setCompareSource] = useState<number>(-1)
    const [compareTarget, setCompareTarget] = useState<number>(-1)

    const [cloneSlug, setCloneSlug] = useState<string>("")
    const [cloneSource, setCloneSource] = useState<number>(-1)
    const [cloneTarget, setCloneTarget] = useState<number>(-1)

    const colDefs = useMemo(
        () =>
            getColumnDefinition(
                columnDefs ?? [],
                isCompatible,
                {
                    compareSource,
                    setCompareSource,
                    setCompareTarget
                },
                {
                    cloneSource,
                    setCloneSource,
                    setCloneTarget,
                    cloneSlug,
                    setCloneSlug
                }
            ),
        [compareSource, isCompatible, cloneSource]
    )

    const columns = useMemo<ColumnDef<any>[]>(() => [...colDefs], [colDefs])

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10 //default page size
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
            pagination
        },
        initialState: {
            columnPinning: {
                left: pinColumns,
                right: []
            }
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.details,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onPaginationChange: setPagination,
        debugTable: true,
        ...(isSubComponent && { getRowCanExpand: () => true })
    })

    const renderSubComponent = ({ row }: { row: Row<any> }) => {
        return (
            <pre style={{ fontSize: "10px", whiteSpace: "normal" }}>
                <code>
                    {JSON.stringify(
                        {
                            [compareField as string]:
                                row.original?.[compareField as string]
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        )
    }

    const handleExportToCsv = (): void => {
        const config = {
            filename: "exportTable",
            sheet: {
                data: []
            }
        }
        const csvRow = config.sheet.data
        const headers = table
            .getHeaderGroups()
            .map((x) => x.headers)
            .flat()

        const headerRow: [] = []
        headers.map((col) => {
            // @ts-ignore
            return headerRow.push({ value: col.id, type: "string" })
        })

        // @ts-ignore
        csvRow.push(headerRow)

        const rows = table.getCoreRowModel().rows

        rows.map((row: any) => {
            const dataRow: [] = []

            headerRow.map((header: { value: string; type: string }) => {
                // @ts-ignore
                return dataRow.push({
                    value: row.getValue(header?.value),
                    type: "string"
                })
            })

            // @ts-ignore
            csvRow.push(dataRow)
        })

        console.log(`csvRow`, csvRow)

        generateExcel(config)
    }

    const { tableFlatRow, tableGenRow } = useMemo(() => {
        return {
            tableFlatRow: table.getExpandedRowModel()?.flatRows?.length ?? 0,
            tableGenRow: table.getExpandedRowModel()?.rows?.length ?? 0
        }
    }, [table.getExpandedRowModel()?.flatRows?.length ?? 0])

    useEffect(() => {
        if (tableGenRow !== tableFlatRow && tableGenRow !== 0) {
            setPagination({
                pageIndex: pagination.pageIndex,
                pageSize: tableFlatRow
            })
        }
    }, [tableGenRow, tableFlatRow])

    return (
        <div className="d-flex flex-column w-100 h-100">
            <div
                className="overflow-auto mb-3"
                style={{ minHeight: tableMinHeight }}>
                <table className="shadow w-100 overflow-auto">
                    <thead
                        className="s-section-primary"
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 20
                        }}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} style={{ height: 35 }}>
                                {headerGroup.headers.map((header) => {
                                    const { column } = header
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            //IMPORTANT: This is where the magic happens!
                                            style={{
                                                ...getCommonPinningStyles(
                                                    column,
                                                    "th",
                                                    true
                                                )
                                            }}>
                                            <div className="whitespace-nowrap s-section-primary">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <Fragment key={row.id}>
                                <tr
                                    key={row.id}
                                    style={{
                                        borderBottom: "1px solid black",
                                        height: 35
                                    }}
                                    className={`whitespace-nowrap ${zebra ? "s-zebra-hover" : ""}`}>
                                    {row.getVisibleCells().map((cell) => {
                                        const { column } = cell
                                        return (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    ...getCommonPinningStyles(
                                                        column,
                                                        "td"
                                                    ),
                                                    backgroundColor:
                                                        zebra && index % 2 == 0
                                                            ? "#f2f2f2"
                                                            : "white"
                                                }}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                                {row.getIsExpanded() && isSubComponent && (
                                    <tr>
                                        <td colSpan={3}>
                                            {renderSubComponent({ row })}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {(data ?? []).length > 10 && <AdminTablePagination table={table} />}
            {isCompatible && (
                <AdminDiffViewer
                    sourceJson={data[compareSource]?.[compareField as string]}
                    targetJson={data[compareTarget]?.[compareField as string]}
                />
            )}
            {isRefresh && (
                <div className="d-flex justify-content-end">
                    <div style={{ width: 80 }}>
                        <AdminButton
                            Icon={HiOutlineArrowPath}
                            label=""
                            onClick={() => {
                                getData && getData()
                            }}
                        />
                    </div>
                </div>
            )}
            {!excludeExport && (
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: "Export Excel",
                            desc: "Export CSV file to view in Excel.",
                            action: handleExportToCsv,
                            authCode: exportAuthCode ?? "AVAILABLE_CODE"
                        }
                    ]}
                />
            )}
        </div>
    )
}
