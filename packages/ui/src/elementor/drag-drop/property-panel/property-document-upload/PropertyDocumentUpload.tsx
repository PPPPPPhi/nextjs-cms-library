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
    const [fileValue, setFileValue] = useState<{}>({})
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const uploadID = `file_uploader_${uuid_v4()}`

    const fileApdator = new DocumentResourceAdaptor()
    const fileOperator = DocumentResourceOperator.getInstance(fileApdator)

    const uploadDocument = async (e: any) => {
        console.log(`uploadDocument`, e)

        const fileData = e.target.files[0]

        const { filePath } = await fileOperator.uploadFile(
            fileData as File,
            site as string
        )
        setFileValue({ filePath, fileType: fileData?.type })
    }

    useEffect(() => {
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
                defaultValue={fileValue}
                resetValue={() => {
                    resetValue()
                }}
            />
        </div>
    )
}
