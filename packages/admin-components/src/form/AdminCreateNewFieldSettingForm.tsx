import { useEffect, useState } from "react"
import { AdminToggleInput, AdminTextInput } from "../input"

interface AdminCreateNewFieldSettingFormInterface {
    onFormValueChange: (v: createNewFieldSettingFormType) => void
}

export type createNewFieldSettingFormType = {
    key: string
    name: string
    isLangMode: boolean
}

export const AdminCreateNewFieldSettingForm: React.FC<
    AdminCreateNewFieldSettingFormInterface
> = ({ onFormValueChange }) => {
    const [inputs, setInput] = useState<createNewFieldSettingFormType>()

    const handleChange = (field: string, value: string | boolean) => {
        setInput((v) => ({
            ...(v as createNewFieldSettingFormType),
            [field]: value
        }))
    }

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as createNewFieldSettingFormType)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6  p-2">
            <AdminTextInput
                label="Key"
                onChange={(v) => handleChange("key", v)}
            />
            <AdminTextInput
                label="Name"
                onChange={(v) => handleChange("name", v)}
            />
            <AdminToggleInput
                label="Is Language field?"
                onChange={(v) => handleChange("isLangMode", v)}
            />
        </div>
    )
}
