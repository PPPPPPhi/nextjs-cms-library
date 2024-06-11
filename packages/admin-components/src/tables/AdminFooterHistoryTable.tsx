import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { pageRowType } from "@nextjs-cms-library/admin-components/index"
import { HiEye } from "react-icons/hi"

interface AdminFooterHistoryTableInterface {
    data: pageRowType[]
    isCompatible: boolean
    // createNewPage: (d: pageRowType) => void
    // publishPage: (d: pageRowType) => void
}

export const AdminFooterHistoryTable: React.FC<
    AdminFooterHistoryTableInterface
> = ({
    data,
    isCompatible
    // createNewPage,
    // publishPage
}) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "slug", "language", "version"]}
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
                            const { _id, version } = data
                            router.push(
                                `/admin/${site}/pages/${_id}/${version}`
                            )
                        }
                    },
                    {
                        accessorKey: "slug",
                        header: "Slug",
                        cellType: "edit",
                        isExpandable: true,
                        enableResize: true,
                        action: (data) => {
                            // const { _id } = data
                            // if (_id) router.push(`pages/${_id}`)
                            // else createNewPage(data)
                        }
                    },
                    {
                        accessorKey: "language",
                        header: "Language",
                        cellType: "badge",
                        size: 100
                    },
                    {
                        accessorKey: "version",
                        header: "Version",
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
