import { ChangeEvent, useState, useEffect } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import { FaCheck } from "react-icons/fa6"

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
        setValue(defaultValue || false)
    }, [defaultValue])

    return (
        <div className="d-flex al align-items-center" style={{ minHeight: 38 }}>
            <ToggleButton
                value="check"
                selected={value}
                onChange={(v) => {
                    setValue(!value)
                    onChange(!value)
                }}>
                <FaCheck />
            </ToggleButton>
            {label && (
                <label className="s-text-color-alpha text-font-medium ml-3">
                    {label}
                </label>
            )}
        </div>
    )
}
