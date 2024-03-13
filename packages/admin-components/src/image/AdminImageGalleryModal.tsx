import { useEffect, useState, useRef } from "react"
// import { useAdminContext } from "@/client/context/admin/AdminContext"
import { useParams } from "next/navigation"
import {
    ImageResourceAdaptor,
    ImageResourceOperator
} from "@nextjs-cms-library/ui/index"
import { AdminImageGallery } from "./AdminImageGallery"
import { imageType } from "@nextjs-cms-library/db-services/index"

interface AdminImageGalleryModalInterface {
    onImageSelected: (path: string) => void
    setModal: (data: adminModalType) => void
    setLoading: (data: boolean) => void
}

type adminModalType = {
    title: string
    content: React.ReactNode
    confirmCTAText?: string
    cancelCTAText?: string
    confirmHandler?: () => void
    closeHandler?: () => void
}

export const AdminImageGalleryModal: React.FC<
    AdminImageGalleryModalInterface
> = ({ onImageSelected, setModal, setLoading }) => {
    // const { setModal, setLoading } = useAdminContext()
    const [selected, setSelected] = useState()

    const imageApdator = new ImageResourceAdaptor()
    // @ts-ignore
    const imageOperator = ImageResourceOperator.getInstance(imageApdator)
    const { site } = useParams()
    const imageRef = useRef()
    const imageIdRef = useRef()

    const [selectId, setSelectedId] = useState<string>("")

    const chooseFromGallery = async () => {
        setLoading(true)
        const imageRes = await imageOperator.getImages(site as string)
        // @ts-ignore
        const images = imageRes.data?.images

        setModal({
            title: "Choose from image gallery",
            content: (
                <AdminImageGallery
                    images={images}
                    onClick={(v) => {
                        // @ts-ignore
                        imageRef.current = `${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${images[v].relativePath}`
                        imageIdRef.current = images[v]?._id
                    }}
                />
            ),
            confirmCTAText: "Confirm",
            confirmHandler: () => {
                console.log(
                    `[modal confirm] image confirm`,
                    imageRef.current,
                    selectId
                )
                onImageSelected(imageIdRef.current as unknown as string)
            },
            cancelCTAText: "Cancel"
        })
        setLoading(false)
    }

    useEffect(() => {
        chooseFromGallery()
    }, [])

    return <></>
}
