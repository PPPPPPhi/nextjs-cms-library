import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { PropertyJson } from "../../../../core/utils/type/index"
import { ElementNameMap } from "../../../../utils/index"
import { useDisplayPanelContext } from "../.."
import { Control, Controller } from "react-hook-form"
import { PreviewSelectImage } from "./PreviewFile"

type ImageSelectorProps = {}

export const ImageSelector: React.FC<ImageSelectorProps> = ({}) => {
    return (
        <div className={`shadow fixed`}>
            <div>Select Image</div>
            <div>Image List ....</div>
        </div>
    )
}

type AdminImageGalleryModalProps = {
    onImageSelected: (path: string) => void
}

export const AdminImageGalleryModal: React.FC<AdminImageGalleryModalProps> = ({
    onImageSelected
}) => {
    return (
        <div
            className={`shadow fixed s-file-selector-modal s-section-primary`}
            style={{}}>
            <div>Select Image</div>
            <div>Image List ....</div>

            <div
                style={{
                    width: "80%",
                    height: 30,
                    borderRadius: 25
                }}
                onClick={() => {
                    console.log(`[modal] confirm`, onImageSelected)
                    onImageSelected("/cake1.png")
                }}
                className={`flex justify-center cursor-pointer s-adminGradientBg shadow mb-1 s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center items-center me-2`}>
                Confirm
            </div>
        </div>
    )
}

type FileSelectorProps = {
    name: string
    label: string
    value: string
    control: Control<PropertyJson, any, PropertyJson>
    element: string
    isChildren?: boolean
}

export const FileSelector: React.FC<FileSelectorProps> = ({
    name,
    label,
    value,
    control,
    element,
    isChildren
}) => {
    const { focusEditId } = useDisplayPanelContext()
    const { site, pageId } = useParams()

    // const slug = `demo2`
    const [enableModel, setEnableModal] = useState<boolean>(false)

    const updateSelectFile = () => {
        setEnableModal(false)
    }

    console.log(`[fileselect] control `, control)

    return (
        <div>
            {control && (
                <Controller
                    control={control}
                    // @ts-ignore
                    name={name}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <div className={`flex flex-col justify-center`}>
                                <p className="mb-1 text-gray-500 dark:text-gray-400">
                                    {label}
                                </p>

                                <div
                                    style={{
                                        width: "80%",
                                        height: 30,
                                        borderRadius: 25
                                    }}
                                    onClick={() => {
                                        setEnableModal(true)
                                        console.log(
                                            `[modal] enable popup`,
                                            element,
                                            ElementNameMap.Image,
                                            site
                                        )
                                    }}
                                    className={`flex justify-center cursor-pointer s-adminGradientBg shadow mb-1 s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center items-center me-2`}>
                                    <span>Select File</span>
                                </div>

                                {enableModel &&
                                    element == ElementNameMap?.Image && (
                                        <div>
                                            <AdminImageGalleryModal
                                                onImageSelected={(e) => {
                                                    console.log(
                                                        `[modal] close 2`
                                                    )
                                                    onChange(e)
                                                    updateSelectFile()
                                                    console.log(`[modal] close`)
                                                }}
                                            />
                                        </div>
                                    )}

                                <p className="mb-1 text-gray-500 dark:text-gray-400">
                                    {element == ElementNameMap.Image &&
                                        value && (
                                            <PreviewSelectImage
                                                site={site as string}
                                                value={value as string}
                                                handler={() => onChange("")}
                                            />
                                        )}
                                </p>
                            </div>
                        )
                    }}
                />
            )}
        </div>
    )
}
