"use client"

import React, { useState, useEffect } from "react"
import Select from "react-select"

interface PropertySelectorInterface {
    onChange: (value: any) => void
    defaultValue?: any
    options?: { label: string; value: any }[]
    label?: string
}

export const PropertySelector: React.FC<PropertySelectorInterface> = ({
    options,
    onChange,
    defaultValue,
    label
}) => {
    const defaultOption = options?.find((k) => k.value === defaultValue)
    const [isSettle, setIsSettle] = useState<boolean>(false)

    const [selectedOption, setSelectedOption] = useState(defaultOption ?? null)

    useEffect(() => {
        if (!isSettle && defaultValue) {
            // @ts-ignore
            setSelectedOption(defaultOption)
            setIsSettle(true)
        }
    }, [defaultValue])

    useEffect(() => {
        onChange(selectedOption?.value)
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
