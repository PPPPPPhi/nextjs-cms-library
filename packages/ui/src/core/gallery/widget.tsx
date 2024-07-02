"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"

type GalleryProps = WidgetProps & {}

export const Gallery: React.FC<GalleryProps> = ({
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
