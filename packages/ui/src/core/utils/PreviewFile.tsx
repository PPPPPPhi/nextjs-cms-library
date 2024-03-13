"use client"

// import { imageType } from "@nextjs-cms-library/db-services/index"
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import {
    DragDropButton,
    ImageResourceAdaptor,
    ImageResourceOperator,
    NextImageApdator
} from "../../utils/index"
import { DisplayControllerButtons } from "../../elementor/drag-drop/control-bar/DisplayControlBar"
import { CancelSvg } from "../../elementor/drag-drop/control-bar/DisplayControlButtons"
import { DragDropComponentButtons } from "../../elementor/drag-drop/drag-drop-panel/DragDropComponent"
import { imageType } from "@nextjs-cms-library/db-services/index"
// import { AdminImageGallery } from "@nextjs-cms-library/admin-components/index"

type PreviewSelectImageProps = {
    value: string
    site: string
    handler: () => void
    isEdit?: boolean
}

export const PreviewSelectImage: React.FC<PreviewSelectImageProps> = ({
    site,
    value,
    handler,
    isEdit = false
}) => {
    const imageApdator = new ImageResourceAdaptor()
    // @ts-ignore
    const imageOperator = ImageResourceOperator.getInstance(imageApdator)

    const [srcPath, setSrcPath] = useState<string>("")

    const getImageById = async () => {
        if (!value) return
        console.log(`[modal confirm] preview value`, value)
        const imageRes = await imageOperator
            .getImageById(site, value)
            .then((res: any) => {
                console.log(
                    `[modal confirm] res`,
                    res,
                    res?.relativePath,
                    res?.data?.images?.relativePath
                )

                const image = res?.data?.images
                setSrcPath(image?.relativePath)
            })
    }

    useEffect(() => {
        getImageById()
    }, [value])

    return (
        <div
            className={`mt-3 rounded`}
            style={{ border: isEdit ? "dashed thin darkgrey" : "" }}>
            {isEdit && (
                <div className="mt-2 s-edit-control-btn flex flex-row justify-cend ">
                    <DragDropComponentButtons
                        buttonType={DragDropButton.delete}
                        handleEvent={handler}
                    />
                </div>
            )}

            <div
                className="col-12 col-md-4 position-relative"
                style={{
                    width: "auto",
                    height: 300
                }}>
                <NextImageApdator
                    src={`${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${srcPath}`}
                    alt="profile"
                    isStatic
                    fill
                    style={{
                        objectFit: "contain",
                        objectPosition: "center"
                    }}
                />
            </div>
        </div>
    )
}
