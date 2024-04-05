"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { PropertyJson } from "../../../../core/utils/type/index"
import {
    ElementNameMap,
    PropertiesComponentProps
} from "../../../../utils/index"
import { useDisplayPanelContext } from "../.."
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import { PreviewSelectImage } from "../../../../core/utils/PreviewFile"
import { AdminImageGalleryModal } from "@nextjs-cms-library/admin-components/index"

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

export const AdminImageGalleryBox: React.FC<AdminImageGalleryModalProps> = ({
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

interface PropertyImageSelectorInterface {
    value?: string
    isChildren?: boolean
    onChange?: UseFormSetValue<PropertiesComponentProps>
}

export const PropertyImageSelector: React.FC<
    PropertyImageSelectorInterface
> = ({ value, onChange }) => {
    const { setModal, setLoading } = useDisplayPanelContext()
    const { site, pageId } = useParams()

    // const slug = `demo2`
    const [enableModel, setEnableModal] = useState<boolean>(false)

    const updateImageValue = (id: any) => {
        console.log("idddd", id)
        // @ts-ignore
        if (onChange) onChange(id)
        setEnableModal(false)
    }

    return (
        <div>
            <div className={`flex flex-col justify-center`}>
                <div
                    style={{
                        width: "80%",
                        height: 30,
                        borderRadius: 25
                    }}
                    onClick={() => {
                        setEnableModal(true)
                    }}
                    className={`flex justify-center cursor-pointer s-adminGradientBg shadow mb-1 s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center items-center me-2`}>
                    <span>Select File</span>
                </div>

                {enableModel && (
                    <div>
                        <AdminImageGalleryModal
                            onImageSelected={updateImageValue}
                            setModal={setModal}
                            setLoading={setLoading}
                        />
                    </div>
                )}

                <p className="mb-1 text-gray-500 dark:text-gray-400">
                    {value && (
                        <PreviewSelectImage
                            height={300}
                            site={site as string}
                            value={value as string}
                            handler={() => {}}
                            isEdit={true}
                        />
                    )}
                </p>
            </div>
        </div>
    )
}
