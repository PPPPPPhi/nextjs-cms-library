import { useState, useEffect } from "react"
import { AdminTextInput, AdminSelect } from "../input"

interface AdminEditPageFormInterface {
    onFormValueChange: (v: editPageFormType) => void
    defaultValue: editPageFormType
}

export type editPageFormType = {
    name: string
    description: string
    slug: string
    language: string
}

export const AdminEditPageForm: React.FC<AdminEditPageFormInterface> = ({
    onFormValueChange,
    defaultValue
}) => {
    const [inputs, setInput] = useState<editPageFormType>(defaultValue)

    const handleChange = (field: string, value: string | File) => {
        setInput((v) => ({ ...(v as editPageFormType), [field]: value }))
    }

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as editPageFormType)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6  p-2">
            <AdminTextInput
                label="Name"
                onChange={(v) => handleChange("name", v)}
                defaultValue={defaultValue?.name ?? ""}
            />
            <AdminTextInput
                label="Slug"
                defaultValue={defaultValue?.slug ?? ""}
                onChange={(v) => handleChange("slug", v)}
                disabled
            />
            <AdminTextInput
                label="Description"
                onChange={(v) => handleChange("description", v)}
                defaultValue={defaultValue?.description ?? ""}
            />
            <AdminTextInput
                label="Language"
                onChange={(v) => handleChange("language", v)}
                defaultValue={defaultValue?.language ?? ""}
                disabled
            />
        </div>
    )
}
