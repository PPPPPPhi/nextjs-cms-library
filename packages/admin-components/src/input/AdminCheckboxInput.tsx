import { ChangeEvent, ReactNode, useState } from "react"
import { AdminToggleInput } from "./AdminToggleInput"

interface AdminCheckboxInputInterface {
    label?: string | ReactNode
    inputLabel?: string
    onChange: (v: boolean) => void
    defaultValue?: boolean
    disabled?: boolean
}

export const AdminCheckboxInput: React.FC<AdminCheckboxInputInterface> = ({
    label,
    inputLabel,
    defaultValue,
    onChange,
    disabled
}) => {
    const [value, setValue] = useState<boolean>(defaultValue || false)

    return (
        <div className="w-100 py-1">
            {inputLabel && (
                <label className="s-text-color-alpha text-font-medium mb-2">
                    {inputLabel}
                </label>
            )}
            <div className="d-flex">
                <AdminToggleInput
                    label={label as string}
                    defaultValue={value}
                    onChange={(v) => {
                        setValue(v)
                        onChange(v)
                    }}
                />
            </div>
        </div>
    )
}
