import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
    publicationRowType,
    publishDetailType
} from "@nextjs-cms-library/admin-components/index"
import { HiEye, HiPencil } from "react-icons/hi"

interface AdminProductCategoryTableInterface {
    data: publicationRowType[]
    isCompatible: boolean
}

// export type pagePublicationHistoryRowType = publicationRowType & {
//     event: string
//     version: number
// }

export const AdminProductCategoryTable: React.FC<
    AdminProductCategoryTableInterface
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
                        "category",
                        "subCategory",
                        "createdAt",
                        "updatedAt"
                    ]}
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
                                    `/admin/${site}/product/category/${data?._id}`
                                )
                            }
                        },
                        {
                            accessorKey: "category",
                            header: "category",
                            cellType: "desc",
                            size: 100
                        },
                        {
                            accessorKey: "subCategory",
                            header: "subCategory",
                            cellType: "desc"
                        },
                        {
                            accessorKey: "createdAt",
                            header: "createdAt",
                            cellType: "desc"
                        },
                        {
                            accessorKey: "updatedAt",
                            header: "updatedAt",
                            cellType: "desc",
                            size: 220
                        }
                    ]}
                />
            </>
        )
    }, [data])

    return <div className="d-flex w-100 overflow-auto">{tableContent}</div>
}
