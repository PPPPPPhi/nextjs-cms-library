import { useState } from "react"

interface AdminRadioButtonInterface {
    groupId: string
    options: string[]
    value: string
    onChange: (r: string) => void
}

export const AdminRadioButton: React.FC<AdminRadioButtonInterface> = ({
    groupId,
    options,
    value,
    onChange
}) => {
    const [r, setR] = useState<string>(value ?? "")

    return (
        <div>
            {options.map((l, idx) => (
                <div
                    className="d-flex align-items-center"
                    style={{ minHeight: 30 }}>
                    <input
                        className="mx-2"
                        type="radio"
                        id={`${groupId}_${idx}`}
                        checked={l === r}
                        name={groupId}
                        value={l}
                        onChange={(evt) => {
                            setR(evt.target.value)
                            onChange(evt.target.value)
                        }}
                    />
                    <span>{l}</span>
                </div>
            ))}
        </div>
    )
}
