import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
    publicationRowType,
    publishDetailType
} from "@nextjs-cms-library/admin-components/index"
import { HiEye, HiPencil } from "react-icons/hi"

interface AdminProductOrderTableInterface {
    data: publicationRowType[]
    isCompatible: boolean
}

// export type pagePublicationHistoryRowType = publicationRowType & {
//     event: string
//     version: number
// }

export const AdminProductOrderTable: React.FC<
    AdminProductOrderTableInterface
> = ({ data, isCompatible }) => {
    const router = useRouter()
    const { site } = useParams()


    const tableContent = useMemo(() => {
        return (
            <>
                <AdminTable
                    data={data ?? []}
                    pinColumns={[]}
                    isCompatible={isCompatible}
                    isSubComponent
                    zebra={true}
                    compareField="pageJson"
                    columnDefs={[
                        {
                            accessorKey: "_id",
                            header: "",
                            cellType: "action",
                            headerIcon: <HiPencil />,
                            size: 100,
                            action: (data) => {
                                const { pageId, pageVersion } = data
                                router.push(
                                    `/admin/${site}/orders/${data?._id}`
                                )
                            }
                        },
                        {
                            accessorKey: "_id",
                            header: "Order",
                            cellType: "cell",
                            size: 200
                        },
                        {
                            accessorKey: "orderStatus",
                            header: "Order Status",
                            cellType: "badge",
                            size: 150
                        },
                        {
                            accessorKey: "paymentStatus",
                            header: "Payment Status",
                            cellType: "cell",
                            size: 150
                        },
                        {
                            accessorKey: "shippingStatus",
                            header: "Shipping Status",
                            cellType: "cell",
                            size: 220
                        },
                        {
                            accessorKey: "customer",
                            header: "Customer",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "store",
                            header: "Store",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "createdAt",
                            header: "Created On",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "orderTotal",
                            header: "Order Total",
                            cellType: "cell",
                            size: 180
                        }
                    ]}
                />
            </>
        )
    }, [data])

    return <div className="d-flex w-100 overflow-auto">{tableContent}</div>
}
