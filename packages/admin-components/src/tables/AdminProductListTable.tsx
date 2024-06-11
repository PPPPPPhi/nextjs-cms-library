import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
    publicationRowType,
    publishDetailType
} from "@nextjs-cms-library/admin-components/index"
import { HiEye, HiPencil } from "react-icons/hi"
import { productType } from "@nextjs-cms-library/db-services/index"

interface AdminProductListTableInterface {
    data: any[]
    isCompatible: boolean
}

// export type pagePublicationHistoryRowType = publicationRowType & {
//     event: string
//     version: number
// }

export const AdminProductListTable: React.FC<
    AdminProductListTableInterface
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
                           
                                router.push(
                                    `/admin/${site}/products/${data?._id}`
                                )
                            }
                        },
                        {
                            accessorKey: "photo",
                            header: "Photo",
                            cellType: "photo",
                            size: 100
                        },
                        {
                            accessorKey: "categories",
                            header: "Categories",
                            cellType: "badgeList",
                            size: 300
                        },
                        {
                            accessorKey: "productName",
                            header: "Product",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "sku",
                            header: "SKU",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "price",
                            header: "Price",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "stockQuantity",
                            header: "Stock",
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
