import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { useRouter } from "next/navigation"
import { siteType } from "@nextjs-cms-library/db-services/index"
import moment from "moment"
import styles from "../AdminControl.module.scss"
import { AdminActionButton } from "../core/AdminActionButton"
import { AdminTextInput } from "../input/AdminTextInput"
import { AdminUploadFile } from "../input/AdminUploadFile"
import { useState, useEffect } from "react"

export interface EditSiteFormRef {
    name: string
    description: string
    image?: string
    imageFile?: File
}

interface AdminSiteCardInterface {
    name: string
    description: string
    image: string
    onChangeModalValue: (value: EditSiteFormRef) => void
}

export const AdminEditSiteModal: React.FC<AdminSiteCardInterface> = ({
    name,
    description,
    image,
    onChangeModalValue
}) => {
    const [inputs, setInput] = useState<EditSiteFormRef>({
        name,
        description,
        image
    })

    const handleChange = (field: string, value: any) => {
        console.log(`change ref`, field, value)
        setInput((v: any) => ({
            ...(v as EditSiteFormRef),
            [field]: value
        }))
    }

    useEffect(() => {
        if (inputs) onChangeModalValue(inputs as EditSiteFormRef)
    }, [inputs])

    return (
        <div className="p-2 col-12 col-md-6 d-flex flex-col">
            <div className={`py-2`}>
                <span className={`pb-1`}>Name</span>
                <AdminTextInput
                    label="Name"
                    defaultValue={name ?? ""}
                    onChange={(v) => handleChange("name", v)}
                />
            </div>

            <div className={`py-2`}>
                <span className={`pb-1`}>Description</span>

                <AdminTextInput
                    label="Description"
                    defaultValue={description ?? ""}
                    onChange={(v) => handleChange("description", v)}
                />
            </div>

            <div className={`py-2`}>
                <AdminUploadFile
                    label="Image"
                    onChange={(v) => {
                        console.log(`file upload`, v)
                        handleChange("imageFile", v)
                    }}
                />
            </div>
        </div>
    )
}
