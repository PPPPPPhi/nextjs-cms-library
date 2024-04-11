import { useEffect, useState } from "react"
import { AdminTextInput, AdminSelect } from "../input"

interface AdminCreatePageFormInterface {
    onFormValueChange: (v: createPageFormType) => void
    defaultValue: any
    langs: string[]
}

export type createPageFormType = {
    name: string
    description: string
    slug: string
    language: File
    langs: string[]
}

export const AdminCreatePageForm: React.FC<AdminCreatePageFormInterface> = ({
    onFormValueChange,
    defaultValue,
    langs
}) => {
    const [inputs, setInput] = useState<createPageFormType>(defaultValue)
    const [langList, setLangList] = useState<string[]>()

    const handleChange = (field: string, value: string | File) => {
        setInput((v) => ({ ...(v as createPageFormType), [field]: value }))
    }

    useEffect(() => {
        setLangList(langs)
    }, [langs])

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as createPageFormType)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6 s-section-quaternary p-2">
            <AdminTextInput
                label="Name"
                onChange={(v) => handleChange("name", v)}
            />
            <AdminTextInput
                label="Slug"
                defaultValue={defaultValue?.slug ?? ""}
                onChange={(v) => handleChange("slug", v)}
            />
            <AdminTextInput
                label="Description"
                onChange={(v) => handleChange("description", v)}
            />
            {langList && (
                <AdminSelect
                    label="language"
                    options={
                        langList?.map((k) => {
                            return { label: k, value: k }
                        }) ?? []
                    }
                    onSelect={(v) => handleChange("language", v)}
                    defaultValue={defaultValue?.language ?? ""}
                />
            )}
        </div>
    )
}
