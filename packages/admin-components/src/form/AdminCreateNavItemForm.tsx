import { useEffect, useState } from "react"
import { AdminToggleInput, AdminTextInput, AdminSelect } from "../input"

type naviagtionType = {
    name: string
    url: string
    target: "_blank" | "_self"
    children?: naviagtionType[]
    level?: number
}

interface AdminCreateNavItemFormInterface {
    onFormValueChange: (v: createNavItemFormType) => void
    defaultValue?: createNavItemFormType | Partial<naviagtionType>
}

export type createNavItemFormType = {
    name: string
    url: string
    target: boolean
}

export const AdminCreateNavItemForm: React.FC<
    AdminCreateNavItemFormInterface
> = ({ onFormValueChange, defaultValue }) => {
    const [inputs, setInput] = useState<
        createNavItemFormType | Partial<naviagtionType | undefined>
    >(defaultValue)

    const handleChange = (field: string, value: string | boolean) => {
        setInput((v) => ({
            ...(v as createNavItemFormType),
            [field]: value
        }))
    }

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as createNavItemFormType)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6 s-section-primary p-2 py-4 rounded-2">
            <AdminTextInput
                label="Name"
                defaultValue={defaultValue?.name ?? ""}
                onChange={(v) => handleChange("name", v)}
            />
            <AdminTextInput
                label="Url"
                defaultValue={defaultValue?.url ?? ""}
                onChange={(v) => handleChange("url", v)}
            />
            <AdminSelect
                label="Rendering method (new tab/ current tab)"
                options={[
                    { value: "_blank", label: "Open in new tab" },
                    { value: "_self", label: "Open in current tab" }
                ]}
                onSelect={(v) => {
                    handleChange("target", v)
                }}
                defaultValue={defaultValue?.target ?? ""}
            />
        </div>
    )
}
