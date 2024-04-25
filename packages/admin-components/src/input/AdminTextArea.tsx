import { ChangeEvent, useState, CSSProperties } from "react"

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
    const [value, setValue] = useState<string>(defaultValue || "")
    return (
        <div className="w-100">
            {label && (
                <label className="s-text-color-alpha text-font-medium mb-2">
                    {label}
                </label>
            )}
            <div>
                <textarea
                    id="username"
                    name="username"
                    autoComplete="off"
                    rows={3}
                    required
                    readOnly={readOnly}
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    style={{ ...style }}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }}
                    className="block w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}
