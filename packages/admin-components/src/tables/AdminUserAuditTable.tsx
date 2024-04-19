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
    console.log("datadata", data)

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={[]}
                columnDefs={[
                    {
                        accessorKey: "updatedAt",
                        header: "Action Time",
                        cellType: "date",
                        size: 200
                    },
                    {
                        accessorKey: "category",
                        header: "Category",
                        cellType: "cell",
                        size: 150
                    },
                    {
                        accessorKey: "action",
                        header: "Action",
                        cellType: "cell",
                        enableResize: true
                    }
                ]}
            />
        </div>
    )
}
