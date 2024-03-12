import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { settingPublicationType } from "@nextjs-cms-library/db-services/index"
import { HiEye } from "react-icons/hi"

interface AdminSiteSettingPublicationHistoryTableInterface {
    data: settingPublicationType[]
    isCompatible: boolean
    publishSetting: (data: settingPublicationType & { version: string }) => void
}

export type siteSettingPublicationHistoryRowType = settingPublicationType & {
    event: string
    version: number
}

export const AdminSiteSettingPublicationHistoryTable: React.FC<
    AdminSiteSettingPublicationHistoryTableInterface
> = ({ data, isCompatible }) => {
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
                        accessorKey: "settingVersion",
                        header: "Setting Version",
                        cellType: "cell",
                        size: 150
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
                        size: 180,
                        action: (data) => {
                            // await postAdminClientAPI(
                            //     `site-setting/${site}/publication`,
                            //     {
                            //         version:
                            //             row.row.original.settingVersion?.split(
                            //                 "."
                            //             )[0]
                            //     }
                            // )
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
