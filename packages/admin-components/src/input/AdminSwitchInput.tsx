import { ChangeEvent, useState, useEffect } from "react"
import Switch from "@mui/material/Switch"
import { FaCheck } from "react-icons/fa6"

interface AdminSwitchInputInterface {
    label?: string
    onChange: (v: boolean) => void
    defaultValue?: boolean
    disabled?: boolean
}

export const AdminSwitchInput: React.FC<AdminSwitchInputInterface> = ({
    label,
    defaultValue,
    onChange,
    disabled
}) => {
    const [value, setValue] = useState<boolean>(defaultValue || false)

    useEffect(() => {
        setValue(defaultValue || false)
    }, [defaultValue])

    return (
        <div className="d-flex al align-items-center" style={{ minHeight: 38 }}>
            <Switch
                checked={value}
                onChange={() => {
                    setValue(!value)
                    onChange(!value)
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
