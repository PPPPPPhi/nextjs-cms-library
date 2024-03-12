import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"

interface AdminPageListTableInterface {
    data: pageRowType[]
    createNewPage: (d: pageRowType) => void
    publishPage: (d: pageRowType) => void
}

type pageDetailType = {
    _id: string
    updatedBy: string
    updatedAt: string
    createdBy: string
    createdAt: string
    language: string
} & pageRowType

export type pageRowType = {
    site: string
    slug: string
    details: pageDetailType[]
}

export const AdminPageListTable: React.FC<AdminPageListTableInterface> = ({
    data,
    createNewPage,
    publishPage
}) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["slug", "language"]}
                columnDefs={[
                    {
                        accessorKey: "slug",
                        header: "Slug",
                        cellType: "edit",
                        isExpandable: true,
                        action: (data) => {
                            const { _id } = data
                            if (_id) router.push(`pages/${_id}`)
                            else createNewPage(data)
                        }
                    },
                    {
                        accessorKey: "language",
                        header: "Language",
                        cellType: "badge",
                        size: 100
                    },
                    {
                        accessorKey: "name",
                        header: "Name",
                        cellType: "cell"
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
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "Publish",
                        size: 100,
                        action: (data) => {
                            publishPage(data)
                        }
                    },
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "History",
                        size: 100,
                        action: (data) => {
                            const { _id } = data
                            router.push(`pages/${_id}/history`)
                        }
                    }
                ]}
            />
        </div>
    )
}
