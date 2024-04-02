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
import { columnDefsType } from "../types/type"
import { AdminDiffViewer } from "./AdminDiffViewer"
import { AdminTablePagination } from "./components/AdminTablePagination"

import { getCsvBlob } from "tanstack-table-export-to-csv"
import FileSaver from "file-saver"

interface AdminTableInterface {
    data: any[]
    pinColumns: string[]
    columnDefs: columnDefsType[]
    compareField?: string
    isCompatible?: boolean
    isSubComponent?: boolean
    zebra?: boolean
}

export const AdminTable: React.FC<AdminTableInterface> = ({
    data,
    pinColumns,
    columnDefs,
    compareField,
    isCompatible,
    isSubComponent,
    zebra = false
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
        const headers = table
            .getHeaderGroups()
            .map((x) => x.headers)
            .flat()

        const rows = table.getRowModel().rows

        const csvBlob = getCsvBlob(headers, rows)

        console.log(`export csv`, headers, rows, csvBlob)

        // exportToCsv("export_data", headers, rows)
        FileSaver.saveAs(csvBlob, "data.csv")
    }

    return (
        <div className="d-flex flex-column w-100 h-100">
            <div className="overflow-auto mb-3" style={{ minHeight: 400 }}>
                <table className="shadow w-100 overflow-auto">
                    <thead
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
                                            <div className="whitespace-nowrap">
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
                                                    width: 180,
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

            <button onClick={handleExportToCsv}>Export to csv</button>
        </div>
    )
}
