import { imageType } from "@nextjs-cms-library/db-services/index"
import { Gallery } from "react-grid-gallery"
import useGalleryFormer from "./hook/useGalleryFormer"
import { useState } from "react"

interface AdminImageGalleryInterface {
    images: imageType[]
    onClick?: (v: any) => void
}

interface AdminImageGalleryItemInterface {
    label: string
}

const AdminImageGalleryItem: React.FC<AdminImageGalleryItemInterface> = ({
    label
}) => {
    return (
        <div
            className="d-flex w-100 h-100 p-2"
            style={{ background: "rgba(0,0,0,0.5)" }}>
            <span
                className="text-font-bold text-level-body s-text-color-alpha"
                style={{ wordBreak: "break-word" }}>
                {label}
            </span>
        </div>
    )
}

export const AdminImageGallery: React.FC<AdminImageGalleryInterface> = ({
    images,
    onClick
}) => {
    const [selected, setSelected] = useState<number>()
    const imageList = useGalleryFormer(
        images,
        AdminImageGalleryItem,
        selected as number
    )

    return (
        <Gallery
            images={imageList}
            enableImageSelection={false}
            rowHeight={250}
            onClick={(v: number) => {
                setSelected(v)
                onClick && onClick(v)
            }}
        />
    )
}
