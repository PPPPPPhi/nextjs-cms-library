"use client"

import { useState, useEffect } from "react"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponentProps } from "../../../../utils/index"
import { UseFormSetValue } from "react-hook-form"
import { Input, Box } from "@mui/material"
import { v4 as uuid_v4 } from "uuid"
import { ImCross } from "react-icons/im"
// import { Document, Page } from "react-pdf"

interface PropertyDocumentPreviewInterface {
    defaultName?: string
    defaultValue?: string[]
    resetValue?: () => void
}

export const PropertyDocumentPreview: React.FC<
    PropertyDocumentPreviewInterface
> = ({ defaultName, defaultValue, resetValue }) => {
    const [fileName, setFileName] = useState<string>("")
    const [fileValue, setFileValue] = useState<string[]>([])

    useEffect(() => {
        setFileName(defaultName ?? "")
    }, [defaultName])

    useEffect(() => {
        setFileValue(defaultValue ?? [])
    }, [defaultValue])

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
