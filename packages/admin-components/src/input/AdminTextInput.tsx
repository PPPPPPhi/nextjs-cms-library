import { ChangeEvent, useState, CSSProperties, useEffect } from "react"
import { AdminButton } from "../core"

interface AdminTextInputInterface {
    label?: string
    onChange: (v: string) => void
    defaultValue?: string
    placeHolder?: string
    disabled?: boolean
    readOnly?: boolean
    type?: string
    style?: CSSProperties
    action?: {
        label: string
        onAction: () => void
    }
    dialog?: string
    isRequired?: boolean
    unit?: string
}

export const AdminTextInput: React.FC<AdminTextInputInterface> = ({
    label,
    defaultValue,
    onChange,
    placeHolder,
    disabled,
    readOnly,
    type,
    style,
    action,
    dialog,
    isRequired,
    unit
}) => {
    const [value, setValue] = useState<string | undefined>(defaultValue)

    useEffect(() => {
        if (!defaultValue) return

        setValue(defaultValue)
    }, [defaultValue])

    return (
        <div className="w-100">
            {label && (
                <label className="s-text-color-alpha text-font-medium mb-2">
                    {label}
                </label>
            )}
            <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <input
                    id="username"
                    name="username"
                    type={type ?? "text"}
                    autoComplete="off"
                    required={isRequired}
                    readOnly={readOnly}
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    style={{ ...style }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }}
                    className="block w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {action && (
                    <div className="h-100 px-2">
                        <AdminButton
                            label={action?.label}
                            onClick={action?.onAction}
                        />
                    </div>
                )}
                {unit && <span className="px-2 text-level-remark">{unit}</span>}
                {isRequired && (
                    <span className="px-2" style={{ color: "red" }}>
                        *
                    </span>
                )}
                {dialog && (
                    <div
                        className="p-2 shadow-sm s-section-primary rouded-2"
                        style={{ flex: 1 }}>
                        <span>{dialog}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
