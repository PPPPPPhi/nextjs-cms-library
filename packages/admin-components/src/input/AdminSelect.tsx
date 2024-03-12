import React, { useState, useEffect } from "react"
import Select from "react-select"

interface AdminSelectInterface {
    options: { label: string; value: any }[]
    onSelect: (value: any) => void
    defaultValue?: any
    label?: string
}

export const AdminSelect: React.FC<AdminSelectInterface> = ({
    options,
    onSelect,
    defaultValue,
    label
}) => {
    const defaultOption = options?.find((k) => k.value === defaultValue)

    const [selectedOption, setSelectedOption] = useState(defaultOption ?? null)

    useEffect(() => {
        onSelect(selectedOption?.value)
    }, [selectedOption])

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
                placeholder="Please Select your option(s)"
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                styles={{
                    menuPortal: (base: any) => ({ ...base, zIndex: 30 })
                }}
            />
        </div>
    )
}
