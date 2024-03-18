import React, { useState, useEffect } from "react"
import Select from "react-select"

interface SelectorInterface {
    options: { label: string; value: any }[]
    onSelect: (value: any) => void
    defaultValue?: any
    label?: string
}

export const Selector: React.FC<SelectorInterface> = ({
    options,
    onSelect,
    defaultValue,
    label
}) => {
    const defaultOption = options?.find((k) => k.value === defaultValue)
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const [selectedOption, setSelectedOption] = useState(defaultOption ?? null)

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setSelectedOption(defaultOption)
            setIsSettle(true)
        }
    }, [defaultValue])

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
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Please Select your option(s)"
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                styles={{
                    menuPortal: (base: any) => ({ ...base, zIndex: 999 })
                }}
            />
        </div>
    )
}
