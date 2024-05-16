import { ChangeEvent, useState, CSSProperties, useEffect } from "react"
import { TextareaAutosize } from "@mui/base/TextareaAutosize"

interface AdminTextInputInterface {
    label?: string
    onChange: (v: string) => void
    defaultValue?: string
    placeHolder?: string
    disabled?: boolean
    readOnly?: boolean
    style?: CSSProperties
}

export const AdminTextArea: React.FC<AdminTextInputInterface> = ({
    label,
    defaultValue,
    onChange,
    placeHolder,
    disabled,
    readOnly,
    style
}) => {
    const [value, setValue] = useState<string | undefined>(defaultValue)

    useEffect(() => {
        if (!defaultValue) return

        setValue(defaultValue)
    }, [defaultValue])
    return (
        <div className="w-100 Mui-TextArea">
            <div
                className="d-flex align-items-center w-100"
                style={{
                    flex: 1,
                    height: 70,

                    background: "white"
                }}>
                <TextareaAutosize
                    className="s-text-color-alpha"
                    autoComplete="off"
                    placeholder={label ?? ""}
                    value={value}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}
