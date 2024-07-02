"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import {
    ImageResourceAdaptor,
    ImageResourceOperator,
    PropertiesComponentProps,
    DocumentResourceAdaptor,
    DocumentResourceOperator
} from "../../../../utils/index"
import { UseFormSetValue } from "react-hook-form"
import { Input, Box } from "@mui/material"
import { v4 as uuid_v4 } from "uuid"
import { PropertyDocumentPreview } from "./PropertyDocumentPreview"

interface PropertyDocumentUploadInterface {
    defaultValue?: string[]
    onChange?: UseFormSetValue<PropertiesComponentProps>
}

export const PropertyDocumentUpload: React.FC<
    PropertyDocumentUploadInterface
> = ({ defaultValue, onChange }) => {
    const { site } = useParams()
    const [fileName, setFileName] = useState<string>("")
    const [fileValue, setFileValue] = useState<string[]>([])
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const uploadID = `file_uploader_${uuid_v4()}`

    const fileApdator = new DocumentResourceAdaptor()
    const fileOperator = DocumentResourceOperator.getInstance(fileApdator)

    const uploadDocument = async (e: any) => {
        console.log(`uploadDocument`, e)

        const fileData = e.target.files[0]

        console.log(`uploadDocument fileData`, fileData)
        const fileValue = {
            fileName: fileData?.name,
            // memory leak with URL.createObject
            fileData: "",
            size: fileData?.size,
            lastModified: fileData?.lastModified,
            srcData: fileData,
            type: fileData?.type,
            s3Key: ""
        }
        console.log(`uploadDocument fileValue`, fileValue)
        setFileName(fileData?.name)
        setFileValue(fileData)

        await fileOperator.uploadFile(fileData as File, site as string)
        // setFileValue(imgs)
    }

    useEffect(() => {
        console.log(`doc upload onchange `, onChange)
        try {
            if (onChange && fileValue) {
                // @ts-ignore
                onChange(fileValue)
            }
        } catch (err) {
            console.log(`use effect err`, err)
        }
    }, [fileValue])

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setFileValue(defaultValue ?? [])
            setIsSettle(true)
        }
    }, [defaultValue])

    const resetValue = () => {
        try {
            if (onChange) {
                // @ts-ignore
                onChange([])
                setFileValue([])
                setFileName("")
            }
        } catch (err) {
            console.log(`resetValue err`, err)
        }
    }

    return (
        <div className="space-y-3">
            <Input
                id={uploadID}
                type="file"
                className={`d-none`}
                onChange={uploadDocument}
            />

            <Box component="span">
                <AdminButton
                    label="Browse"
                    style={{ width: "100%" }}
                    onClick={() => {
                        document
                            .querySelector(`#${uploadID}`)
                            ?.dispatchEvent(new MouseEvent("click"))
                    }}
                />
            </Box>

            <PropertyDocumentPreview
                defaultName={fileName}
                defaultValue={fileValue}
                resetValue={() => {
                    resetValue()
                }}
            />
        </div>
    )
}
