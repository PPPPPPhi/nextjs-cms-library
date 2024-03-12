import { ChangeEvent, useState } from "react"

interface AdminToggleInputInterface {
    label?: string
    onChange: (v: boolean) => void
    defaultValue?: boolean
    disabled?: boolean
}

export const AdminToggleInput: React.FC<AdminToggleInputInterface> = ({
    label,
    defaultValue,
    onChange,
    disabled
}) => {
    const [value, setValue] = useState<boolean>(defaultValue || false)

    return (
        <div className="w-100">
            <div className="d-flex">
                <input
                    id="username"
                    name={label}
                    type="checkbox"
                    autoComplete="off"
                    required
                    disabled={disabled}
                    checked={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.checked)
                        onChange(event.target.checked)
                    }}
                    className=""
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
