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
                    pinColumns={[
                        "_id",
                        "promotion",
                        "startDate",
                        "endDate",
                        "items",
                        "promotionCode"
                    ]}
                    isCompatible={isCompatible}
                    isSubComponent
                    compareField="pageJson"
                    columnDefs={[
                        {
                            accessorKey: "_id",
                            header: "",
                            cellType: "action",
                            headerIcon: <HiEye />,
                            size: 100,
                            action: (data) => {
                                const { pageId, pageVersion } = data
                                router.push(
                                    `../../pages/${pageId}/${
                                        pageVersion.split(".")[0]
                                    }`
                                )
                            }
                        },
                        {
                            accessorKey: "promotion",
                            header: "promotion",
                            cellType: "desc",
                            size: 100
                        },
                        {
                            accessorKey: "startDate",
                            header: "startDate",
                            cellType: "desc"
                        },
                        {
                            accessorKey: "endDate",
                            header: "endDate",
                            cellType: "desc"
                        },
                        {
                            accessorKey: "items",
                            header: "items",
                            cellType: "desc",
                            size: 220
                        },
                        {
                            accessorKey: "promotionCode",
                            header: "promotionCode",
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
