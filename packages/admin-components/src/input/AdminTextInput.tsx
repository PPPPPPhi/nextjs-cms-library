import { ChangeEvent, useState, CSSProperties, useEffect } from "react"
import { AdminActionButton, AdminButton } from "../core"
import TextField from "@mui/material/TextField"

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
    endAdorment?: {
        label: string
        onClick: () => void
    }
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
    unit,
    endAdorment = {}
}) => {
    const [value, setValue] = useState<string | number | undefined>(
        defaultValue
    )

    const { label: endLabel, onClick: endAction } = endAdorment

    useEffect(() => {
        if (!defaultValue || value == defaultValue) return

        setValue(defaultValue)
    }, [defaultValue])

    return (
        <div className="w-100">
            <div
                className="d-flex align-items-center w-100"
                style={{
                    flex: 1,
                    height: 70,
                    borderRadius: 12,
                    background: "white",
                    ...style
                }}>
                <TextField
                    defaultValue={defaultValue}
                    type={type ?? "text"}
                    id={`type_${type}_text_view`}
                    label={label}
                    placeholder={placeHolder}
                    disabled={readOnly || disabled}
                    value={type == "number" && !value ? 0 : value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }}
                    InputProps={{
                        endAdornment: endAdorment && (
                            <AdminActionButton
                                inverseStyle
                                label={endLabel as string}
                                onClick={() => {
                                    endAction && endAction()
                                }}
                            />
                        )
                    }}
                />
                {action && (
                    <div className="px-2">
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
