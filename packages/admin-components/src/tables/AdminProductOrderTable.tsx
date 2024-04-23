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
                    zebra={true}
                    compareField="pageJson"
                    columnDefs={[
                        {
                            accessorKey: "description",
                            header: "Description",
                            cellType: "cell",
                            size: 200
                        },
                        {
                            accessorKey: "createdAt",
                            header: "Created At",
                            cellType: "date",
                            size: 150
                        },
                        {
                            accessorKey: "updatedAt",
                            header: "Updated At",
                            cellType: "date",
                            size: 150
                        },
                        {
                            accessorKey: "orderStatus",
                            header: "Order Status",
                            cellType: "badge",
                            size: 220
                        },
                        {
                            accessorKey: "paymentStatus",
                            header: "Payment Status",
                            cellType: "badge",
                            size: 180
                        },
                        {
                            accessorKey: "customerId",
                            header: "Customer Id",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "total",
                            header: "Total",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "remark",
                            header: "Remark",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "pickUp",
                            header: "Pick Up",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "orderAddress",
                            header: "Order Address",
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
