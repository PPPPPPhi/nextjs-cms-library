import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
    publicationRowType,
    publishDetailType
} from "@nextjs-cms-library/admin-components/index"
import { HiEye, HiPencil } from "react-icons/hi"

interface AdminProductPromotionTableInterface {
    data: publicationRowType[]
    isCompatible: boolean
}

// export type pagePublicationHistoryRowType = publicationRowType & {
//     event: string
//     version: number
// }

export const AdminProductPromotionTable: React.FC<
    AdminProductPromotionTableInterface
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
                            header: "",
                            cellType: "action",
                            headerIcon: <HiPencil />,
                            size: 100,
                            action: (data) => {
                                const { pageId, pageVersion } = data
                                router.push(
                                    `/admin/${site}/product/promotion/${data?._id}`
                                )
                            }
                        },
                        {
                            accessorKey: "promotion",
                            header: "Promotion",
                            cellType: "cell",
                            size: 200
                        },
                        {
                            accessorKey: "createdAt",
                            header: "Start Date",
                            cellType: "date",
                            enableResize: true
                        },
                        {
                            accessorKey: "updatedAt",
                            header: "End Date",
                            cellType: "date",
                            enableResize: true
                        },
                        {
                            accessorKey: "items",
                            header: "Items",
                            cellType: "cell",
                            size: 220
                        },
                        {
                            accessorKey: "promotionCode",
                            header: "Promotion Code",
                            cellType: "cell",
                            size: 220
                        }
                    ]}
                />
            </>
        )
    }, [data])

    return <div className="d-flex w-100 overflow-auto">{tableContent}</div>
}
