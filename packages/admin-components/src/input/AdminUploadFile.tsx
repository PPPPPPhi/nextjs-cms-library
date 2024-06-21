import { ChangeEvent, useState } from "react"

interface AdminFileInputInterface {
    label?: string
    onChange: (v: File) => void
    defaultValue?: string
    placeHolder?: string
    disabled?: boolean
}

export const AdminUploadFile: React.FC<AdminFileInputInterface> = ({
    label,
    onChange,
    placeHolder,
    disabled
}) => {
    const [value, setValue] = useState<string>()

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
                    type="file"
                    autoComplete="off"
                    required
                    disabled={disabled}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.files) {
                            setValue(event.target.value)
                            onChange(event.target.files[0] as File)
                        }
                    }}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}
