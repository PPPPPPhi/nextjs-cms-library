import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useRef } from "react"
import { useParams, useRouter } from "next/navigation"

import { userType, roleType } from "@nextjs-cms-library/db-services/index"
import { HiEye, HiPencil, HiUsers } from "react-icons/hi"
import { useAdminAuthorizationContext } from "../../../role-management/src/contexts"

interface AdminUserManagementTableInterface {
    data: userRowType[]
    updateActivationStatus: (d: userRowType) => void
    editUser: (d: userRowType) => void
    assignRole: (d: userRowType) => void
}

export type userRowType = userType & { roleItem: roleType[] }

export const AdminUserManagementTable: React.FC<
    AdminUserManagementTableInterface
> = ({ data, updateActivationStatus, editUser, assignRole }) => {
    const router = useRouter()
    const { user } = useAdminAuthorizationContext()

    const userIdRef = useRef<string>(user?._id ?? "")

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "_idx", "_idxx", "_activate"]}
                exportAuthCode="USER_VIEW_ROLE"
                columnDefs={[
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "View",
                        size: 100,
                        authCode: "VIEW_USER_DETAIL",
                        action: (data) => {
                            const { _id } = data
                            if (_id === userIdRef.current)
                                router.push(`/admin/account`)
                            else router.push(`/admin/user-management/${_id}`)
                        }
                    },
                    {
                        accessorKey: "_idx",
                        header: "",
                        cellType: "action",
                        actionTitle: "Edit",
                        size: 100,
                        authCode: "EDIT_OTHER_USER",
                        action: (data) => {
                            editUser(data)
                        }
                    },
                    {
                        accessorKey: "_idxx",
                        header: "",
                        cellType: "action",
                        actionTitle: "Update Profile",
                        size: 150,
                        authCode: "EDIT_OTHER_USER",
                        action: (data) => {
                            assignRole(data)
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
                        authCode: "ACTIVATE_USER_STATUS",
                        action: (data) => {
                            updateActivationStatus(data)
                        }
                    },
                    {
                        accessorKey: "userName",
                        header: "User Name",
                        cellType: "cell",
                        enableResize: true
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
