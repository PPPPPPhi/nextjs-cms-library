import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { pageRowType } from "@nextjs-cms-library/admin-components/index"
import { HiEye } from "react-icons/hi"
import {
    historySchemaType,
    marginalType
} from "@nextjs-cms-library/db-services/index"

type marginalHistoryRowType = marginalType & {
    version: number
}

interface AdminMarginalHistoryTableInterface {
    data: marginalHistoryRowType[]
    isCompatible: boolean
    // createNewPage: (d: pageRowType) => void
    publishMarginal: (d: marginalHistoryRowType) => void
}

export const AdminMarginalHistoryTable: React.FC<
    AdminMarginalHistoryTableInterface
> = ({
    data,
    isCompatible,
    // createNewPage,
    publishMarginal
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
                compareField="properties"
                columnDefs={[
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        headerIcon: <HiEye />,
                        size: 100,
                        action: (data) => {}
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
                        size: 80,
                        isExpandable: true
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
