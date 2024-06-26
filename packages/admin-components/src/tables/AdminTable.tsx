import {
    useMemo,
    useState,
    Fragment,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react"
import {
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
    Row,
    ColumnSort,
    SortingState,
    getSortedRowModel
} from "@tanstack/react-table"
import _ from "lodash"
import { getColumnDefinition, getCommonPinningStyles } from "./utils"
import { HiOutlineArrowPath } from "react-icons/hi2"
import { columnDefsType } from "../types/type"
import { AdminDiffViewer } from "./AdminDiffViewer"
import { AdminTablePagination } from "./components/AdminTablePagination"
import { AdminActionButton } from "../core"
import { getCsvBlob } from "tanstack-table-export-to-csv"
import FileSaver from "file-saver"
import { AdminCard } from "../core/AdminCard"
import {
    ACTION_TYPE,
    VIEW_TYPE
} from "@nextjs-cms-library/role-management/index"
import generateExcel from "zipcelx"
import {
    HiOutlineArrowCircleDown,
    HiOutlineArrowCircleUp
} from "react-icons/hi"

interface AdminTableInterface {
    data: any[]
    pinColumns: string[]
    columnDefs: columnDefsType[]
    ref?: any
    compareField?: string
    isCompatible?: boolean
    isSubComponent?: boolean
    zebra?: boolean
    exportAuthCode?: keyof ACTION_TYPE | keyof VIEW_TYPE
    tableMinHeight?: number
    excludeExport?: boolean
    isRefresh?: boolean
    getData?: () => void
    style?: React.CSSProperties
}

export const AdminTable: React.FC<AdminTableInterface> = forwardRef(
    (
        {
            data,
            pinColumns,
            columnDefs,
            compareField,
            isCompatible,
            isSubComponent,
            zebra = false,
            exportAuthCode,
            tableMinHeight = 550,
            excludeExport,
            isRefresh,
            getData,
            style
        },
        ref
    ) => {
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

        const [sorting, setSorting] = useState<SortingState>([])

        const table = useReactTable({
            data,
            columns,
            state: {
                expanded,
                pagination,
                sorting
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
            getSortedRowModel: getSortedRowModel(),
            onPaginationChange: setPagination,
            onSortingChange: setSorting,
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

        useImperativeHandle(ref, () => ({
            handleExportToCsv() {
                handleExportToCsv()
            }
        }))

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

            generateExcel(config)
        }

        const { tableFlatRow, tableGenRow } = useMemo(() => {
            return {
                tableFlatRow:
                    table.getExpandedRowModel()?.flatRows?.length ?? 0,
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
            <div className="d-flex flex-column w-100 p-2 space-y-2 overflow-hidden">
                <div
                    className="shadow-sm overflow-auto"
                    style={{
                        borderRadius: 24,
                        border: "1px solid #F1F1F1",
                        ...style
                    }}>
                    <table className="w-100">
                        <thead
                            className="w-100"
                            style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 20,
                                borderBottom:
                                    "1px solid var(--static-color-text-delta)"
                            }}>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    key={headerGroup.id}
                                    style={{
                                        height: 50
                                    }}>
                                    {headerGroup.headers.map((header) => {
                                        const { column } = header
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                style={{
                                                    ...getCommonPinningStyles(
                                                        column,
                                                        "th",
                                                        true
                                                    )
                                                }}>
                                                <div
                                                    className="d-flex whitespace-nowrap px-2"
                                                    onClick={() => {
                                                        const currentSort =
                                                            sorting.find(
                                                                (
                                                                    s: ColumnSort
                                                                ) =>
                                                                    s?.id ==
                                                                    header.id
                                                            )?.desc

                                                        if (
                                                            header.id == "_id"
                                                        ) {
                                                            setSorting([])
                                                        } else {
                                                            header.column.toggleSorting(
                                                                !currentSort
                                                            )
                                                        }
                                                    }}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
                                                          )}{" "}
                                                    <div className="d-flex flex-col justify-center">
                                                        {{
                                                            asc: (
                                                                <HiOutlineArrowCircleUp
                                                                    style={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        color: "var(--static-color-primary)"
                                                                    }}
                                                                />
                                                            ),
                                                            desc: (
                                                                <HiOutlineArrowCircleDown
                                                                    style={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        color: "var(--static-color-primary)"
                                                                    }}
                                                                />
                                                            )
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ] ?? null}
                                                    </div>
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="overflow-auto w-100">
                            {table.getRowModel().rows.map((row, index) => (
                                <Fragment key={row.id}>
                                    <tr
                                        key={row.id}
                                        style={{
                                            borderBottom:
                                                "1px solid var(--static-color-text-delta)",
                                            height: 50,
                                            backgroundColor:
                                                index % 2 == 0
                                                    ? "#f2f2f2"
                                                    : "white"
                                        }}
                                        className={`whitespace-nowrap s-zebra-hover`}>
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
                                                            index % 2 == 0
                                                                ? "#f2f2f2"
                                                                : "white"
                                                    }}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
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
                {(data ?? []).length > 10 && (
                    <AdminTablePagination table={table} />
                )}
                {isCompatible && (
                    <AdminDiffViewer
                        sourceJson={
                            data[compareSource]?.[compareField as string]
                        }
                        targetJson={
                            data[compareTarget]?.[compareField as string]
                        }
                    />
                )}
                {isRefresh && (
                    <div className="d-flex justify-content-end">
                        <AdminActionButton
                            Icon={HiOutlineArrowPath}
                            style={{ minWidth: 50 }}
                            label=""
                            onClick={() => {
                                getData && getData()
                            }}
                        />
                    </div>
                )}
                {/* {!excludeExport && (
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
                )} */}
            </div>
        )
    }
)
