"use client"

import { useState, useEffect, useMemo } from "react"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponentProps } from "../../../../utils/index"
import { UseFormSetValue } from "react-hook-form"
import { Input, Box } from "@mui/material"
import { v4 as uuid_v4 } from "uuid"
import { ImCross } from "react-icons/im"
// import { Document, Page } from "react-pdf"

type FileValueType = {
    filePath?: string
    fileType?: string
}

interface PropertyDocumentPreviewInterface {
    defaultValue: FileValueType
    resetValue?: () => void
}

export const PropertyDocumentPreview: React.FC<
    PropertyDocumentPreviewInterface
> = ({ defaultValue, resetValue }) => {
    const [fileValue, setFileValue] = useState<FileValueType>({})

    useEffect(() => {
        setFileValue(defaultValue ?? [])
    }, [defaultValue])

    const fileName = useMemo(() => {
        return fileValue?.filePath ?? ""
    }, [fileValue])

    return (
        <div className="space-y-3">
            <div
                className={`d-flex flex-row w-100 justify-content-end cursor-pointer`}
                onClick={() => {
                    return resetValue && resetValue()
                }}>
                <ImCross />
            </div>
            {fileName && (
                <div
                    className={`d-block text-level-caption s-text-color-core justify-content-center text-break`}>
                    {fileName}
                </div>
            )}
            {/* {fileValue?.[0] && (
                <div className={`d-block`}>
                    <Document file={fileValue?.[0]}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )} */}
        </div>
    )
}
