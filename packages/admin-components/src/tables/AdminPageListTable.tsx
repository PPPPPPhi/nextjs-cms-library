import { AdminTable } from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { forwardRef, useImperativeHandle, useRef } from "react"

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
    ref: any
    editPage: (d: pageRowType) => void
    removePage: (d: pageRowType) => void
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

export const AdminPageListTable: React.FC<AdminPageListTableInterface> =
    forwardRef(
        (
            {
                data,
                createNewPage,
                publishPage,
                cloneLangPage,
                editPage,
                removePage
            },
            ref
        ) => {
            const router = useRouter()

            useImperativeHandle(ref, () => ({
                handleExportToCsv() {
                    tableContainerRef.current?.handleExportToCsv()
                }
            }))

            const tableContainerRef = useRef<{
                handleExportToCsv: () => void
            }>()

            return (
                <div className="d-flex w-100">
                    <AdminTable
                        data={data ?? []}
                        ref={tableContainerRef}
                        pinColumns={["slug", "language"]}
                        columnDefs={[
                            {
                                accessorKey: "slug",
                                header: "Slug",
                                cellType: "edit",
                                isExpandable: true,
                                size: 350,
                                action: (data) => {
                                    const { _id } = data
                                    if (_id) {
                                        router.push(`pages/${_id}`)
                                    } else {
                                        createNewPage(data)
                                    }
                                },
                                collapseEdit: (data) => {
                                    editPage && editPage(data)
                                },
                                collapseRemove: (data) => {
                                    removePage && removePage(data)
                                }
                            },
                            {
                                accessorKey: "language",
                                header: "Language",
                                cellType: "badge",
                                size: 120
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
                                    const { slug, refLangIdx, language } =
                                        d ?? {}
                                    const srcLang = data.find(
                                        (l) => l.slug === slug
                                    )?.details[refLangIdx]?.language
                                    cloneLangPage({
                                        ...d,
                                        srcLang,
                                        refLang: language
                                    })
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
    )
