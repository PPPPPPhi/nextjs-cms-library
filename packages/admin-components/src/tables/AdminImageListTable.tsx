import {
    AdminTable,
    useAdminContext
} from "@nextjs-cms-library/admin-components/index"
import { useParams, useRouter } from "next/navigation"
import { forwardRef, useImperativeHandle, useMemo } from "react"
import { HiEye, HiPencil } from "react-icons/hi2"
import { FaTrash } from "react-icons/fa6"
import { imageType } from "@nextjs-cms-library/db-services/index"
import { NextImageApdator } from "../../../ui/src/utils"

interface AdminPageListTableInterface {
    data: imageType[]
}

export const AdminImageListTable: React.FC<AdminPageListTableInterface> = ({
    data
}) => {
    const router = useRouter()
    const { site } = useParams()
    const { setModal } = useAdminContext()

    const mutatedData = useMemo(() => {
        return (data ?? [])?.map((l) => ({
            ...l,
            relativePath: `/${site}${l.relativePath}`
        }))
    }, [data])

    const viewPhotoInModal = (path: string) => {
        setModal({
            title: "View Image",
            content: (
                <div>
                    <NextImageApdator
                        src={path}
                        alt="site photo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        isStatic={false}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center"
                        }}
                    />
                </div>
            ),
            confirmCTAText: "Confirm",
            confirmHandler: () => {},
            isNoCloseBtn: true,
            pannelHeight: 75,
            pannelWidth: 75
        })
    }

    console.log("mutatedData", mutatedData)

    return (
        <div className="d-flex w-100 overflow-auto">
            <AdminTable
                data={mutatedData ?? []}
                pinColumns={[]}
                columnDefs={[
                    {
                        accessorKey: "_edit",
                        header: "Edit",
                        cellType: "action",
                        headerIcon: <HiEye />,
                        actionTitle: "",
                        size: 100,
                        action: (data) => {
                            const { relativePath } = data
                            viewPhotoInModal(relativePath)
                        }
                    },
                    {
                        accessorKey: "_edit",
                        header: "Edit",
                        cellType: "action",
                        headerIcon: <HiPencil />,
                        actionTitle: "",
                        size: 100,
                        action: (data) => {
                            const { relativePath } = data
                            // viewPhotoInModal(relativePath)
                        }
                    },
                    {
                        accessorKey: "_delete",
                        header: "Delete",
                        cellType: "action",
                        headerIcon: <FaTrash />,
                        actionTitle: "",
                        size: 100,
                        action: (data) => {
                            const { _id } = data
                        }
                    },
                    {
                        accessorKey: "name",
                        header: "Name",
                        cellType: "cell",
                        enableResize: true
                    },
                    {
                        accessorKey: "relativePath",
                        header: "Image",
                        cellType: "photo",
                        size: 120
                    },
                    {
                        accessorKey: "extension",
                        header: "Extension",
                        cellType: "cell",
                        size: 120
                    },
                    {
                        accessorKey: "createdBy",
                        header: "Created By",
                        cellType: "cell",
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
                    }
                ]}
            />
        </div>
    )
}
