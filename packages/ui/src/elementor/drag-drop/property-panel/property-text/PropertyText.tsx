"use client"
import { useState, useEffect } from "react"
import { AdminTextInput } from "@nextjs-cms-library/admin-components/index"
interface PropertyTextInterface {
    label: string
    defaultValue: string
    onChange: (v: string) => void
}

export const PropertyText: React.FC<PropertyTextInterface> = ({
    label,
    defaultValue,
    onChange
}) => {
    const [value, setValue] = useState("")
    const [isSettle, setIsSettle] = useState<boolean>(false)

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setValue(defaultValue)
            setIsSettle(true)
        }
    }, [defaultValue])

    return (
        <div className="d-flex p-2 align-items-center justify-content-center">
            <AdminTextInput
                label={label}
                onChange={(v) => {
                    setValue(v)
                    onChange(v)
                }}
                placeHolder="Write your thoughts here..."
                defaultValue={value}
            />
        </div>
    )
}
