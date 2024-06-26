import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { pageRowType } from "@nextjs-cms-library/admin-components/index"
import { HiEye } from "react-icons/hi"
import {
    historySchemaType,
    marginalType
} from "@nextjs-cms-library/db-services/index"

interface AdminNavigationHistoryTableInterface {
    data: marginalType[]
    isCompatible: boolean
    // createNewPage: (d: pageRowType) => void
    // publishPage: (d: pageRowType) => void
}

export const AdminNaviationHistoryTable: React.FC<
    AdminNavigationHistoryTableInterface
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
                        size: 80
                    },
                    // {
                    //     accessorKey: "properties",
                    //     header: "Properties",
                    //     cellType: "desc",
                    //     size: 220
                    // },
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
                        action: (data) => {}
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
