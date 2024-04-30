import { ChangeEvent, useState, useEffect } from "react"

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

    useEffect(() => {
        console.log(`toggle trigger`)
        setValue(defaultValue || false)
    }, [defaultValue])

    return (
        <div className="d-flex al align-items-center" style={{ minHeight: 38 }}>
            <input
                id="username"
                className="cursor-pointer"
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
            />
            {label && (
                <label className="s-text-color-alpha text-font-medium ml-3">
                    {label}
                </label>
            )}
        </div>
    )
}
