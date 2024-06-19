import { useState, useEffect } from "react"
import { AdminTextInput, AdminSelect } from "../input"

interface AdminEditPageSlugFormInterface {
    onFormValueChange: (v: editPageSlugFormType) => void
    defaultValue: editPageSlugFormType
}

export type editPageSlugFormType = {
    name: string
    description: string
    slug: string
    language: string
}

export const AdminEditPageSlugForm: React.FC<
    AdminEditPageSlugFormInterface
> = ({ onFormValueChange, defaultValue }) => {
    const [inputs, setInput] = useState<editPageSlugFormType>(defaultValue)

    const handleChange = (field: string, value: string | File) => {
        setInput((v) => ({ ...(v as editPageSlugFormType), [field]: value }))
    }

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as editPageSlugFormType)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6  p-2">
            <AdminTextInput
                label="Slug"
                defaultValue={defaultValue?.slug ?? ""}
                onChange={(v) => handleChange("slug", v)}
            />
        </div>
    )
}
