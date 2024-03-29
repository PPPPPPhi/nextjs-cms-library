import { AdminSelect } from "../../input"
import { AdminButton } from "../.."
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
                <span
                    className="align-self-center text-font-bold text-level-remark"
                    style={{ flex: 1 }}>
                    Each Page Showing:{" "}
                </span>
                <div style={{ flex: 3 }}>
                    <AdminSelect
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
            <div className="d-flex space-x-2" style={{ flex: 1 }}>
                <AdminButton
                    label="<<"
                    onClick={() => {
                        table.firstPage()
                    }}
                    disabled={!table.getCanPreviousPage()}
                />
                <AdminButton
                    label="<"
                    onClick={() => {
                        table.previousPage()
                    }}
                    disabled={!table.getCanPreviousPage()}
                />
                <AdminButton
                    label=">"
                    onClick={() => {
                        table.nextPage()
                    }}
                    disabled={!table.getCanNextPage()}
                />
                <AdminButton
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
