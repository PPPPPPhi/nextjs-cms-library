// import { imageType } from "@/database/models/image/type"
import { useMemo } from "react"
import { imageType } from "@nextjs-cms-library/db-services/index"

interface AdminImageGalleryItemInterface {
    label: string
}

const useGalleryFormer = (
    images: imageType[],
    ImageHover: React.FC<AdminImageGalleryItemInterface>,
    selected: number
) => {
    const imageList = useMemo(() => {
        return images.map((l, idx) => {
            const ratio = l.height / l.width

            return {
                src: `${process.env.NEXT_IMAGE_UPLOAD_PATH}/${l.site}${l.relativePath}`,
                width: 320,
                height: 320 * ratio,
                tags: [
                    {
                        title: "site",
                        key: l.site,
                        value: (
                            <span className="s-text-color-alpha">{l.site}</span>
                        )
                    },
                    {
                        title: "type",
                        key: l.extension,
                        value: <span>{l.extension}</span>
                    }
                ],
                alt: "Image from CMS",
                isSelected: idx === selected,
                caption: l.description,
                customOverlay: <ImageHover label={l.name} />
            }
        })
    }, [images, selected])

    return imageList
}

export default useGalleryFormer
