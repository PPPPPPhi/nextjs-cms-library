import { ChangeEvent, useState } from "react"

interface AdminTextInputInterface {
    label?: string
    onChange: (v: string) => void
    defaultValue?: string
    placeHolder?: string
    disabled?: boolean
    readOnly?: boolean
    type?: string
}

export const AdminTextInput: React.FC<AdminTextInputInterface> = ({
    label,
    defaultValue,
    onChange,
    placeHolder,
    disabled,
    readOnly,
    type
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
                <input
                    id="username"
                    name="username"
                    type={type ?? "text"}
                    autoComplete="off"
                    required
                    readOnly={readOnly}
                    disabled={disabled}
                    placeholder={placeHolder}
                    value={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}
