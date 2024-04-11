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
                    pinColumns={[
                        "_id",
                        "description",
                        "createdAt",
                        "updatedAt",
                        "orderStatus",
                        "paymentStatus",
                        "customerId",
                        "total",
                        "remark",
                        "pickUp",
                        "orderAddress"
                    ]}
                    isCompatible={isCompatible}
                    isSubComponent
                    zebra={true}
                    compareField="pageJson"
                    columnDefs={[
                        {
                            accessorKey: "description",
                            header: "Description",
                            cellType: "desc",
                            size: 100
                        },
                        {
                            accessorKey: "createdAt",
                            header: "createdAt",
                            cellType: "date"
                        },
                        {
                            accessorKey: "updatedAt",
                            header: "updatedAt",
                            cellType: "date"
                        },
                        {
                            accessorKey: "orderStatus",
                            header: "orderStatus",
                            cellType: "badge",
                            size: 220
                        },
                        {
                            accessorKey: "paymentStatus",
                            header: "paymentStatus",
                            cellType: "badge",
                            size: 180
                        },
                        {
                            accessorKey: "customerId",
                            header: "customerId",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "total",
                            header: "total",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "remark",
                            header: "remark",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "pickUp",
                            header: "pickUp",
                            cellType: "cell",
                            size: 180
                        },
                        {
                            accessorKey: "orderAddress",
                            header: "orderAddress",
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
