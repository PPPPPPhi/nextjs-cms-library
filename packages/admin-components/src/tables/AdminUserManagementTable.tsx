import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"

import { userType, roleType } from "@nextjs-cms-library/db-services/index"
import { HiEye, HiPencil } from "react-icons/hi"

interface AdminUserManagementTableInterface {
    data: userRowType[]
    updateActivationStatus: (d: userRowType) => void
    editUser: (d: userRowType) => void
}

export type userRowType = userType & { roleItem: roleType[] }

export const AdminUserManagementTable: React.FC<
    AdminUserManagementTableInterface
> = ({ data, updateActivationStatus, editUser }) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "_idx", "_activate"]}
                columnDefs={[
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "",
                        headerIcon: <HiEye />,
                        size: 100,
                        action: (data) => {
                            const { _id } = data
                            router.push(`/admin/user-management/${_id}`)
                        }
                    },
                    {
                        accessorKey: "_idx",
                        header: "",
                        cellType: "action",
                        actionTitle: "",
                        headerIcon: <HiPencil />,
                        size: 100,
                        action: (data) => {
                            const { _id } = data
                            editUser(_id)
                        }
                    },
                    {
                        accessorKey: "_activate",
                        header: "",
                        cellType: "action",
                        actionTitle: "Active",
                        actionInverseTitle: "InActive",
                        isActivate: true,
                        size: 120,
                        action: (data) => {
                            updateActivationStatus(data)
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
                        accessorKey: "roleItem",
                        header: "Role",
                        cellType: "badgeList",
                        customStyle: { background: "black", color: "white" },
                        size: 250
                    },
                    {
                        accessorKey: "status",
                        header: "Status",
                        cellType: "badge",
                        badgeTitle: { 1: "Active", 0: "Inactive" },
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
