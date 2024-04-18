import { ChangeEvent, ReactNode, useState } from "react"

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
                <input
                    id="checkbox"
                    name={typeof label === "string" ? label : "checkbox"}
                    type="checkbox"
                    autoComplete="off"
                    required
                    disabled={disabled}
                    checked={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.checked)
                        onChange(event.target.checked)
                    }}
                    style={{ minWidth: 25, minHeight: 25 }}
                    className="cursor-pointer"
                />
                {label && (
                    <label className="s-text-color-alpha text-font-medium ml-3">
                        {label}
                    </label>
                )}
            </div>
        </div>
    )
}
