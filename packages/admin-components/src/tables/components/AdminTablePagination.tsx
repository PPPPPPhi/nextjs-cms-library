import { AdminSelect } from "../../input"
import { AdminActionButton } from "../.."
import { Table } from "@tanstack/react-table"

interface AdminTablePaginationInterface {
    table: Table<any>
}

const PAGINATION_OPTIONS = [10, 20, 30, 40, 50]

export const AdminTablePagination: React.FC<AdminTablePaginationInterface> = ({
    table
}) => {
    return (
        <div className="d-flex w-100 justify-content-between space-x-2 pb-3">
            <div className="d-flex w-100">
                <div style={{ flex: 3 }}>
                    <AdminSelect
                        label="Each Page Showing:"
                        options={
                            PAGINATION_OPTIONS.map((k) => {
                                return { label: k.toString(), value: k }
                            }) ?? []
                        }
                        onSelect={(v) => table.setPageSize(parseInt(v))}
                        defaultValue={10}
                    />
                </div>
            </div>
            <div
                className="d-flex align-items-center h-100 space-x-2 py-2"
                style={{ height: 47 }}>
                <AdminActionButton
                    label="<<"
                    onClick={() => {
                        table.firstPage()
                    }}
                    disabled={!table.getCanPreviousPage()}
                />
                <AdminActionButton
                    label="<"
                    onClick={() => {
                        table.previousPage()
                    }}
                    disabled={!table.getCanPreviousPage()}
                />
                <AdminActionButton
                    label=">"
                    onClick={() => {
                        table.nextPage()
                    }}
                    disabled={!table.getCanNextPage()}
                />
                <AdminActionButton
                    label=">>"
                    onClick={() => {
                        table.lastPage()
                    }}
                    disabled={!table.getCanNextPage()}
                />
            </div>
        </div>
    )
}
