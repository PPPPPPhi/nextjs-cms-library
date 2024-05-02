import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
    publicationRowType,
    publishDetailType
} from "@nextjs-cms-library/admin-components/index"
import { HiEye, HiPencil } from "react-icons/hi"

interface AdminProductCustomerTableInterface {
    data: publicationRowType[]
    isCompatible: boolean
}

// export type pagePublicationHistoryRowType = publicationRowType & {
//     event: string
//     version: number
// }

export const AdminProductCustomerTable: React.FC<
    AdminProductCustomerTableInterface
> = ({ data, isCompatible }) => {
    const router = useRouter()
    const { site } = useParams()

    useEffect(() => {
        console.log(`order list`, data)
    }, [data])

    const tableContent = useMemo(() => {
        return (
            <>
                <AdminTable
                    data={data ?? []}
                    pinColumns={[]}
                    isCompatible={isCompatible}
                    isSubComponent
                    compareField="pageJson"
                    zebra={true}
                    columnDefs={[
                        {
                            accessorKey: "_id",
                            header: "Edit",
                            cellType: "action",
                            headerIcon: <HiPencil />,
                            size: 100,
                            action: (data) => {
                                const { pageId, pageVersion } = data
                                console.log(`pencil click`, data?._id)
                                router.push(
                                    `/admin/${site}/customers/${data?._id}`
                                )
                            }
                        },
                        {
                            accessorKey: "email",
                            header: "Email",
                            cellType: "cell",
                            size: 300
                        },
                        {
                            accessorKey: "fullName",
                            header: "Name",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "customerRoles",
                            header: "Customer Roles",
                            cellType: "badge",
                            enableResize: true
                        },
                        {
                            accessorKey: "companyName",
                            header: "Company Name",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "isActive",
                            header: "Is Active",
                            cellType: "boolean",
                            enableResize: true
                        }
                    ]}
                />
            </>
        )
    }, [data])

    return <div className="d-flex w-100 overflow-auto">{tableContent}</div>
}
