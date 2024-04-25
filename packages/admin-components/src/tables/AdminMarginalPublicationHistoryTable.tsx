import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { marginalType } from "@nextjs-cms-library/db-services/index"
import { HiEye } from "react-icons/hi"

type marginalPublicationRowType = marginalType & {
    version?: number
    marginalVersion?: string
}

interface AdminMarginalPublicationHistoryTableInterface {
    data: marginalPublicationRowType[]
    isCompatible: boolean
    publishMarginal: (
        data: marginalPublicationRowType & { version: string }
    ) => void
}

export type marginalPublicationHistoryRowType = marginalPublicationRowType & {
    event: string
    version: number
}

export const AdminMarginalPublicationHistoryTable: React.FC<
    AdminMarginalPublicationHistoryTableInterface
> = ({ data, isCompatible, publishMarginal }) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "slug", "language", "version"]}
                isCompatible={isCompatible}
                isSubComponent
                compareField="properties"
                columnDefs={[
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        headerIcon: <HiEye />,
                        size: 120,
                        action: (data) => {
                            const { settingVersion } = data
                            router.push(`${settingVersion?.split(".")[0]}`)
                        }
                    },
                    {
                        accessorKey: "site",
                        header: "Site",
                        cellType: "cell",
                        size: 180,
                        isExpandable: true
                    },
                    {
                        accessorKey: "marginalVersion",
                        header: "Marginal Version",
                        cellType: "cell",
                        size: 150
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
                        size: 180,
                        action: (data) => {
                            publishMarginal(data)
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
