import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"

interface AdminPublicationListTableInterface {
    data: publicationRowType[]
    updatePublicationStatus: (d: publishDetailType) => void
}

export type publishDetailType = {
    _id: string
    updatedBy: string
    updatedAt: string
    createdBy: string
    createdAt: string
    language: string
    pageVersion: string
    pageId: string
    status: number
} & publicationRowType

export type publicationRowType = {
    _id: string
    site: string
    slug: string
    details: publishDetailType[]
}

export const AdminPublicationListTable: React.FC<
    AdminPublicationListTableInterface
> = ({ data, updatePublicationStatus }) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["slug", "language", "pageVersion"]}
                columnDefs={[
                    {
                        accessorKey: "slug",
                        header: "Slug",
                        cellType: "view",
                        isDisabled: true,
                        isExpandable: true,
                        action: (data) => {
                            const { pageId, pageVersion } = data
                            router.push(
                                `/admin/${site}/pages/${pageId}/${
                                    pageVersion?.split(".")[0]
                                }`
                            )
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
                        size: 150
                    },
                    {
                        accessorKey: "name",
                        header: "Name",
                        cellType: "cell",
                        enableResize: true
                    },
                    {
                        accessorKey: "createdBy",
                        header: "Created By",
                        cellType: "cell",
                        size: 180
                    },
                    {
                        accessorKey: "createdAt",
                        header: "Created At",
                        cellType: "date",
                        size: 180
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
                        accessorKey: "status",
                        header: "",
                        cellType: "action",
                        action: (data) => {
                            updatePublicationStatus(data)
                        },
                        enableResize: true
                    },
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "History",
                        size: 100,
                        action: (data) => {
                            const { _id } = data
                            router.push(`publications/${_id}/history`)
                        }
                    }
                ]}
            />
        </div>
    )
}
