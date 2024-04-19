import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"

interface AdminPageListTableInterface {
    data: pageRowType[]
    createNewPage: (d: pageRowType) => void
    publishPage: (d: pageDetailType) => void
    cloneLangPage: (
        d: pageDetailType & {
            srcLang: string
            refLang: string
        }
    ) => void
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
    publishPage,
    cloneLangPage
}) => {
    const router = useRouter()

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
                        enableResize: true,
                        action: (data) => {
                            const { _id } = data
                            if (_id) {
                                router.push(`pages/${_id}`)
                            } else {
                                createNewPage(data)
                            }
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
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "Clone",
                        inverseAction: true,
                        isClonable: true,
                        size: 100,
                        action: (d) => {
                            const { slug, refLangIdx, language } = d ?? {}
                            const srcLang = data.find((l) => l.slug === slug)
                                ?.details[refLangIdx]?.language
                            cloneLangPage({ ...d, srcLang, refLang: language })
                        }
                    },
                    {
                        accessorKey: "_id",
                        header: "",
                        cellType: "action",
                        actionTitle: "Publish",
                        size: 100,
                        action: (data) => {
                            publishPage(data)
                        },
                        shouldShow: (data) => {
                            return !!data?._id
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
                        },
                        shouldShow: (data) => {
                            return !!data?._id
                        }
                    }
                ]}
            />
        </div>
    )
}
