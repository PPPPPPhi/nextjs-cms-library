import { useEffect, useState } from "react"
import { AdminTextInput, AdminSelect } from "../input"
import { useAdminContext } from "../context"

interface AdminLanguageSelectFormType {
    onFormValueChange: (v: string) => void
    defaultValue?: any
    isExcludeSelf?: boolean
    currentLang?: string
}

export const AdminLanguageSelectForm: React.FC<AdminLanguageSelectFormType> = ({
    onFormValueChange,
    defaultValue,
    isExcludeSelf,
    currentLang
}) => {
    const [inputs, setInput] = useState<string>(defaultValue)
    const [langList, setLangList] = useState<string[]>()
    const { langLst } = useAdminContext()

    useEffect(() => {
        const langs = [...langLst]
        if (isExcludeSelf) setLangList(langs.filter((l) => l !== currentLang))
        else setLangList(langs)
    }, [langLst])

    const handleChange = (value: string) => {
        setInput(value)
    }

    useEffect(() => {
        if (inputs) onFormValueChange(inputs)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6 s-section-primary p-2">
            {langList && (
                <AdminSelect
                    label="language"
                    options={
                        langList?.map((k) => {
                            return { label: k, value: k }
                        }) ?? []
                    }
                    onSelect={(v) => handleChange(v)}
                    defaultValue={defaultValue?.language ?? ""}
                />
            )}
        </div>
    )
}
