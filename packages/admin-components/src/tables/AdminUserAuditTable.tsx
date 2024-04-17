import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { roleType } from "@nextjs-cms-library/role-management/index"

interface AdminUserAuditTableInterface {
    data: AuditProfileType[]
}

type AuditProfileType = {
    user: string
    category: string
    action: string
    createdAt: string
    description: string
}

export const AdminUserAuditTable: React.FC<AdminUserAuditTableInterface> = ({
    data
}) => {
    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={[]}
                columnDefs={[
                    {
                        accessorKey: "createdAt",
                        header: "Action Time",
                        cellType: "date",
                        size: 200
                    },
                    {
                        accessorKey: "action",
                        header: "Action",
                        cellType: "cell"
                    },
                    {
                        accessorKey: "description",
                        header: "Description",
                        cellType: "cell",
                        size: 360
                    }
                ]}
            />
        </div>
    )
}
