import React from "react"
import { WidgetProps } from "../utils/type/index"

type PhotoGalleryProps = WidgetProps & {}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "PhotoGallery Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
