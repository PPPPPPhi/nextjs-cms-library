"use client"
import React, { useState, useEffect } from "react"
import { WidgetProps } from "../utils/type/index"
import { VideoApdator } from "../common"
import usePropertiesHook from "../hook/usePropertiesHook"

type GalleryProps = WidgetProps & {}

enum GalleryFileType {
    MP4 = "video/mp4",
    PDF = "application/pdf"
}

export const Gallery: React.FC<GalleryProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)
    const { gallery_label, gallery_src } = values ?? {}

    const [galleryType, setGalleryType] = useState<string>(GalleryFileType.PDF)

    useEffect(() => {
        if (gallery_src?.fileType) setGalleryType(gallery_src?.fileType)
    }, [gallery_src])
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {gallery_label ?? "Gallery Label"}
            </div>

            {gallery_src && galleryType == GalleryFileType.MP4 && (
                <VideoApdator isStatic={false} url={gallery_src?.filePath} />
            )}

            {gallery_src && galleryType == GalleryFileType.PDF && (
                <div>preview pdf</div>
            )}
        </div>
    )
}
