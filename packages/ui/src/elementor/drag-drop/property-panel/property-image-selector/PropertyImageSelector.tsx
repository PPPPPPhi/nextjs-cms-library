"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PropertyText } from "../property-text"
import {
    ElementNameMap,
    PropertiesComponentProps,
    ImageResourceAdaptor,
    ImageResourceOperator
} from "../../../../utils/index"
import { useDisplayPanelContext } from "../.."
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import { PreviewSelectImage } from "../../../../core/utils/PreviewFile"
import {
    AdminActionButton,
    AdminImageGalleryModal
} from "@nextjs-cms-library/admin-components/index"

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

type ImagePackType = { alt: string; destination: string; value: string }

interface PropertyImageSelectorInterface {
    value?: string | ImagePackType
    isChildren?: boolean
    onChange?: UseFormSetValue<PropertiesComponentProps>
}

export const PropertyImageSelector: React.FC<
    PropertyImageSelectorInterface
> = ({ value, onChange }) => {
    const { setModal, setLoading } = useDisplayPanelContext()
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const { site, pageId } = useParams()

    const [inputs, setInputs] = useState<ImagePackType>()

    // const slug = `demo2`
    const [enableModel, setEnableModal] = useState<boolean>(false)

    const imageApdator = new ImageResourceAdaptor()
    // @ts-ignore
    const imageOperator = ImageResourceOperator.getInstance(imageApdator)

    const updateImageValue = (relativePath: any) => {
        // @ts-ignore
        // if (onChange) onChange(relativePath)
        setInputs((v) => ({ ...(v as any), value: relativePath }))
        setEnableModal(false)
    }

    const onValueChange = (field: string, value: string) => {
        setInputs((v) => ({ ...(v as any), [field]: value }))
    }

    useEffect(() => {
        if (!isSettle && value) {
            if (typeof value === "string")
                setInputs({ alt: "", destination: "", value })
            else setInputs(value)
            setIsSettle(true)
        }
    }, [value])

    useEffect(() => {
        console.log("innnnnn", inputs)
        //@ts-ignore
        if (onChange && inputs) onChange(inputs)
    }, [inputs])

    return (
        <div>
            <div
                className={`d-flex flex-column justify-content-center space-y-2`}>
                <div>
                    <span className="text-level-caption text-font-normal">
                        Alternative text
                    </span>
                    <PropertyText
                        label={"Alternative text"}
                        defaultValue={inputs?.alt ?? ""}
                        onChange={(v) => {
                            onValueChange("alt", v)
                        }}
                    />
                </div>
                <div>
                    <span className="text-level-caption text-font-normal">
                        Image onClick Destination
                    </span>
                    <PropertyText
                        label={"Destination"}
                        defaultValue={inputs?.destination ?? ""}
                        onChange={(v) => {
                            onValueChange("destination", v)
                        }}
                    />
                </div>
                <AdminActionButton
                    onClick={() => {
                        setEnableModal(true)
                    }}
                    label="Select File"
                />
                {enableModel && (
                    <div>
                        <AdminImageGalleryModal
                            onImageSelected={updateImageValue}
                            passByRelative
                            setModal={setModal}
                            setLoading={setLoading}
                        />
                    </div>
                )}

                <p className="mb-1 text-gray-500 dark:text-gray-400">
                    {inputs?.value && (
                        <PreviewSelectImage
                            height={200}
                            site={site as string}
                            value={inputs?.value as string}
                            handler={() => {
                                updateImageValue("")
                            }}
                            isEdit={true}
                        />
                    )}
                </p>
            </div>
        </div>
    )
}
