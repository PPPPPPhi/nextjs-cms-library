import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import {
    ImageResourceAdaptor,
    ImageResourceOperator
} from "@nextjs-cms-library/ui/index"
import { AdminImageGallery } from "./AdminImageGallery"

interface AdminImageGalleryModalInterface {
    onImageSelected: (path: string) => void
    setModal: (modal: any) => void
    setLoading: (l: boolean) => void
}

export const AdminImageGalleryModal: React.FC<
    AdminImageGalleryModalInterface
> = ({ onImageSelected, setModal, setLoading }) => {
    const imageApdator = new ImageResourceAdaptor()
    const imageOperator = ImageResourceOperator.getInstance(imageApdator)
    const { site } = useParams()
    const imageRef = useRef<string>()

    const chooseFromGallery = async () => {
        setLoading(true)
        const imageRes = await imageOperator.getImages(site as string)
        //@ts-ignore
        const images = imageRes.data?.images

        setModal({
            title: "Choose from image gallery",
            content: (
                <AdminImageGallery
                    images={images}
                    onClick={(v) => {
                        imageRef.current = `${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${images[v].relativePath}`
                    }}
                />
            ),
            confirmCTAText: "Confirm",
            confirmHandler: () => {
                onImageSelected(imageRef.current as string)
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
