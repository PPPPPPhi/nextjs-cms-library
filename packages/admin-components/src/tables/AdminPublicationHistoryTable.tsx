import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import {
    publicationRowType,
    publishDetailType
} from "@nextjs-cms-library/admin-components/index"
import { HiEye, HiPencil } from "react-icons/hi"

interface AdminPublicationHistoryTableInterface {
    data: publicationRowType[]
    isCompatible: boolean
    // createNewPage: (d: pageRowType) => void
    publishPage: (d: publishDetailType & { version: string }) => void
}

export type pagePublicationHistoryRowType = publicationRowType & {
    event: string
    version: number
}

export const AdminPublicationHistoryTable: React.FC<
    AdminPublicationHistoryTableInterface
> = ({ data, isCompatible, publishPage }) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "slug", "language", "pageVersion"]}
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
                        accessorKey: "slug",
                        header: "Slug",
                        cellType: "edit",
                        isExpandable: true,
                        action: (data) => {
                            // await putAdminClientAPI(
                            //     `page/${site}/${row.original._id}`,
                            //     {
                            //         pageJson: JSON.stringify({
                            //             x: Math.random()
                            //         })
                            //     }
                            // )
                        },
                        size: 180
                    },
                    {
                        accessorKey: "language",
                        header: "Language",
                        cellType: "badge",
                        size: 100
                    },
                    {
                        accessorKey: "pageVersion",
                        header: "Page Version",
                        cellType: "cell",
                        size: 80
                    },
                    {
                        accessorKey: "name",
                        header: "Name",
                        cellType: "cell",
                        enableResize: true
                    },
                    {
                        accessorKey: "event",
                        header: "Event",
                        cellType: "desc",
                        size: 220
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
                    },
                    {
                        accessorKey: "_Publish",
                        header: "",
                        cellType: "action",
                        actionTitle: "Publish",
                        size: 100,
                        action: (data) => {
                            const version = data?.pageVersion?.split(".")[0]
                            publishPage({ ...data, version })
                        }
                    },
                    {
                        accessorKey: "_Compare",
                        header: "",
                        cellType: "action",
                        actionTitle: "",
                        size: 100,
                        isCompatible: true
                    }
                ]}
            />
        </div>
    )
}
