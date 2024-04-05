"use client"

// import { imageType } from "@nextjs-cms-library/db-services/index"
import { useState, useEffect } from "react"
import {
    DragDropButton,
    ImageResourceAdaptor,
    ImageResourceOperator,
    NextImageApdator
} from "../../utils/index"
import { DragDropComponentButtons } from "../../elementor/drag-drop/drag-drop-panel/DragDropComponent"

type PreviewSelectImageProps = {
    value: string
    site: string
    handler: () => void
    isEdit?: boolean
    alignment?: "left" | "center" | "right"
    position?: "cover" | "contain" | "fill"
    height?: number
}

export const PreviewSelectImage: React.FC<PreviewSelectImageProps> = ({
    site,
    value,
    handler,
    isEdit = false,
    alignment = "center",
    position = "contain",
    height
}) => {
    const imageApdator = new ImageResourceAdaptor()
    // @ts-ignore
    const imageOperator = ImageResourceOperator.getInstance(imageApdator)

    const [srcPath, setSrcPath] = useState<string>("")

    const getImageById = async () => {
        if (!value) return

        const imageRes = await imageOperator
            .getImageById(site, value)
            .then((res: any) => {
                console.log("imaggggg", res)

                const image = res?.data?.images[0]
                setSrcPath(image?.relativePath)
            })
    }

    useEffect(() => {
        getImageById()
    }, [value])

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

            {srcPath && (
                <div className="col-12 col-md-4 position-relative w-100 h-100">
                    <NextImageApdator
                        src={`${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${srcPath}`}
                        alt="profile"
                        isStatic
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: "100%",
                            height: height ?? "100%",
                            objectFit: position,
                            objectPosition: alignment
                        }}
                    />
                </div>
            )}
        </div>
    )
}
