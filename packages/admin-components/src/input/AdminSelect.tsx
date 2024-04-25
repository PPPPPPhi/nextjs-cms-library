import React, { useState, useEffect, useMemo } from "react"
import Select from "react-select"

interface AdminSelectInterface {
    options: { label: string; value: any }[]
    onSelect: (value: any) => void
    defaultValue?: any
    label?: string
    placeHolder?: string
    remark?: string
}

export const AdminSelect: React.FC<AdminSelectInterface> = ({
    options,
    onSelect,
    defaultValue,
    label,
    placeHolder,
    remark
}) => {
    const defaultOption = options?.find((k) => k.value === defaultValue)

    const [selectedOption, setSelectedOption] = useState(defaultOption ?? null)

    useEffect(() => {
        onSelect(selectedOption?.value)
    }, [selectedOption])

    const placeH = useMemo(
        () => placeHolder ?? "Please Select your option",
        [placeHolder]
    )

    return (
        <div className="w-100">
            {label && (
                <label className="s-text-color-alpha text-font-medium mb-2">
                    {label}
                </label>
            )}
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder={placeH}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                styles={{
                    menuPortal: (base: any) => ({ ...base, zIndex: 999 })
                }}
            />
            {remark && (
                <span
                    className="text-level-remark text-font-normal"
                    style={{ fontStyle: "italic" }}>
                    {remark}
                </span>
            )}
        </div>
    )
}
