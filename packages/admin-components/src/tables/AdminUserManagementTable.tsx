import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"

import { userType, roleType } from "@nextjs-cms-library/db-services/index"
import { HiPencil } from "react-icons/hi"

interface AdminUserManagementTableInterface {
    data: userRowType[]
    updateActivationStatus: (d: userRowType) => void
}

export type userRowType = userType & { roleItem: roleType[] }

export const AdminUserManagementTable: React.FC<
    AdminUserManagementTableInterface
> = ({ data, updateActivationStatus }) => {
    const router = useRouter()
    const { site } = useParams()

    console.log("dadaadadadaad", data)

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "_activate"]}
                columnDefs={[
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "",
                        headerIcon: <HiPencil />,
                        size: 100,
                        action: (data) => {
                            const { version } = data
                            router.push(`${version}`)
                        }
                    },
                    {
                        accessorKey: "_activate",
                        header: "",
                        cellType: "action",
                        actionTitle: "Inactivate",
                        size: 120,
                        action: (data) => {
                            updateActivationStatus(data)
                            // await putAdminClientAPI(
                            //     `publication/${site}/${row.row.original._id}`,
                            //     {
                            //         status: !Boolean(row.getValue())
                            //     }
                            // )
                        }
                    },
                    {
                        accessorKey: "userName",
                        header: "User Name",
                        cellType: "cell"
                    },
                    {
                        accessorKey: "firstName",
                        header: "First Name",
                        cellType: "cell",
                        size: 180
                    },
                    {
                        accessorKey: "lastName",
                        header: "Last Name",
                        cellType: "cell",
                        size: 180
                    },
                    {
                        accessorKey: "_role",
                        header: "Role",
                        cellType: "badge",
                        customStyle: { background: "black", color: "white" },
                        size: 130
                    },
                    {
                        accessorKey: "status",
                        header: "Status",
                        cellType: "badge",
                        size: 130
                    },
                    {
                        accessorKey: "updatedBy",
                        header: "Updated By",
                        cellType: "cell",
                        size: 180
                    },
                    {
                        accessorKey: "updatedAt",
                        header: "Updated At",
                        cellType: "date",
                        size: 180
                    }
                ]}
            />
        </div>
    )
}
