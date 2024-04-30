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
                                    `/admin/${site}/categories/${data?._id}`
                                )
                            }
                        },
                        {
                            accessorKey: "name",
                            header: "Category",
                            cellType: "cell",
                            size: 100
                        },
                        {
                            accessorKey: "parentCategory",
                            header: "Parent Category",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "display",
                            header: "Display",
                            cellType: "boolean",
                            enableResize: true
                        },
                        {
                            accessorKey: "published",
                            header: "Published",
                            cellType: "boolean",
                            enableResize: true
                        },
                        {
                            accessorKey: "createdAt",
                            header: "Created At",
                            cellType: "cell",
                            enableResize: true
                        },
                        {
                            accessorKey: "updatedAt",
                            header: "Updated At",
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
