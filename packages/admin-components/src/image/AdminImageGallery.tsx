// import { imageType } from "@/database/models/image/type"
import { Gallery } from "react-grid-gallery"
import useGalleryFormer from "./hook/useGalleryFormer"
import { useState } from "react"
import { imageType } from "@nextjs-cms-library/db-services/index"

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
            className="d-flex w-100 h-100 p-2 position-relative"
            style={{ background: "rgba(0,0,0,0.3)" }}>
            <span
                className="position-absolute text-font-bold text-level-body s-text-color-nu"
                style={{ wordBreak: "break-word", top: 0, left: 0, zIndex: 1 }}>
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
