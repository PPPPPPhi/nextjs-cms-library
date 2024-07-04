"use client"
import React, { useState, useEffect } from "react"
import _ from "lodash"
import { WidgetProps } from "../utils/type/index"
import { VideoAdaptor, PDFAdaptor } from "../common"
import usePropertiesHook from "../hook/usePropertiesHook"

type GalleryProps = WidgetProps & {}

enum GalleryVideoType {
    MP4 = "video/mp4"
}

enum GalleryDocumentType {
    PDF = "application/pdf"
}

export const Gallery: React.FC<GalleryProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)
    const { gallery_label, gallery_src } = values ?? {}

    const [galleryType, setGalleryType] = useState<string>(
        GalleryDocumentType.PDF
    )

    useEffect(() => {
        if (gallery_src?.fileType) setGalleryType(gallery_src?.fileType)
    }, [gallery_src])

    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {gallery_label ?? "Gallery Label"}
            </div>

            {gallery_src &&
                _.includes(Object.values(GalleryVideoType), galleryType) && (
                    <VideoAdaptor
                        isStatic={false}
                        url={gallery_src?.filePath}
                    />
                )}

            {gallery_src &&
                _.includes(Object.values(GalleryDocumentType), galleryType) && (
                    <PDFAdaptor isStatic={false} url={gallery_src?.filePath} />
                )}

            {!gallery_src && <div></div>}
        </div>
    )
}
