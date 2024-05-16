"use client"

import React, { useState, useEffect } from "react"
import Select from "react-select"
import { AdminSelect } from "@nextjs-cms-library/admin-components/index"
interface PropertySelectorInterface {
    label: string
    onChange: (value: any) => void
    defaultValue?: any
    options: { label: string; value: any }[]
}

export const PropertySelector: React.FC<PropertySelectorInterface> = ({
    options,
    onChange,
    defaultValue,
    label
}) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue)

    useEffect(() => {
        if (defaultValue) setSelectedOption(defaultValue)
    }, [defaultValue])

    useEffect(() => {
        onChange(selectedOption)
    }, [selectedOption])

    return (
        <div className="w-100">
            <AdminSelect
                label={label}
                options={options}
                defaultValue={selectedOption}
                onSelect={setSelectedOption}
                placeHolder="Please Select your option(s)"
            />
        </div>
    )
}
