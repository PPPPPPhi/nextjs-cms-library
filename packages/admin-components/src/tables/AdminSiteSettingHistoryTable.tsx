import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { siteSettingType } from "@nextjs-cms-library/db-services/index"
import { HiEye } from "react-icons/hi"

interface AdminSiteSettingHistoryTableInterface {
    data: siteSettingType[]
    isCompatible: boolean
    publishSiteSetting: (d: siteSettingHistoryRowType) => void
}

export type siteSettingHistoryRowType = siteSettingType & {
    event: string
    version: number
}

export const AdminSiteSettingHistoryTable: React.FC<
    AdminSiteSettingHistoryTableInterface
> = ({ data, publishSiteSetting, isCompatible }) => {
    const router = useRouter()
    const { site } = useParams()

    return (
        <div className="d-flex w-100 h-100">
            <AdminTable
                data={data ?? []}
                pinColumns={["_id", "slug", "language", "version"]}
                isCompatible={isCompatible}
                exportAuthCode="VIEW_SITE_SETTING_HISTORY"
                isSubComponent
                compareField="properties"
                columnDefs={[
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        headerIcon: <HiEye />,
                        authCode: "VIEW_SITE_SETTING_VERSION",
                        size: 180,
                        action: (data) => {
                            const { version } = data
                            router.push(
                                `/admin/${site}/site-setting/${version}`
                            )
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
                        accessorKey: "version",
                        header: "Version",
                        cellType: "cell",
                        size: 180
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
                        authCode: "PUBLISH_SITE_SETTING",
                        size: 180,
                        action: (data) => {
                            publishSiteSetting(data)
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
