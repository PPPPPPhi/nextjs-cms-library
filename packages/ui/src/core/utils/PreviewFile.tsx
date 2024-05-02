"use client"

// import { imageType } from "@nextjs-cms-library/db-services/index"
import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import {
    DragDropButton,
    ImageResourceAdaptor,
    ImageResourceOperator,
    NextImageApdator
} from "../../utils/index"
import { DragDropComponentButtons } from "../../elementor/drag-drop/drag-drop-panel/DragDropComponent"

type PreviewSelectImageProps = {
    value: string
    site?: string
    handler: () => void
    isEdit?: boolean
    alignment?: "left" | "center" | "right"
    position?: "cover" | "contain" | "fill"
    height?: number
    style?: React.CSSProperties
}

export const PreviewSelectImage: React.FC<PreviewSelectImageProps> = ({
    site,
    value,
    handler,
    isEdit = false,
    alignment = "center",
    position = "contain",
    height,
    style
}) => {
    console.log("value", value)
    return (
        <div
            className={`w-100 h-100`}
            style={{ border: isEdit ? "dashed thin darkgrey" : "" }}>
            {isEdit && (
                <div className="mt-2 s-edit-control-btn flex flex-row justify-cend ">
                    <DragDropComponentButtons
                        buttonType={DragDropButton.delete}
                        handleEvent={handler}
                    />
                </div>
            )}

            {value && (
                <NextImageApdator
                    src={`${process.env.NEXT_IMAGE_UPLOAD_PATH}${value}`}
                    alt="profile"
                    isStatic
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: height ?? "100%",
                        objectFit: position,
                        objectPosition: alignment,
                        ...style
                    }}
                />
            )}
        </div>
    )
}
