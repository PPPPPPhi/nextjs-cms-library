import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { roleType } from "@nextjs-cms-library/role-management/index"

interface AdminUserRoleTableInterface {
    data: roleType[]
}

export const AdminUserRoleTable: React.FC<AdminUserRoleTableInterface> = ({
    data
}) => {
    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={[]}
                columnDefs={[
                    {
                        accessorKey: "roleName",
                        header: "Role Name",
                        cellType: "cell"
                    },
                    {
                        accessorKey: "description",
                        header: "Description",
                        cellType: "cell",
                        size: 360
                    },
                    {
                        accessorKey: "sites",
                        header: "Sites",
                        cellType: "badgeList",
                        customStyle: { background: "black", color: "white" },
                        size: 250
                    }
                ]}
            />
        </div>
    )
}
