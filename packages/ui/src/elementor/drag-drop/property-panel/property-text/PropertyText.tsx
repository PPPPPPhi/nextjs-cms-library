"use client"
import { useState, useEffect } from "react"

interface PropertyTextInterface {
    defaultValue: string
    onChange: (v: string) => void
}

export const PropertyText: React.FC<PropertyTextInterface> = ({
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
            <textarea
                id="message"
                style={{ padding: 10 }}
                rows={3}
                className="s-text-color-alpha w-100"
                placeholder="Write your thoughts here..."
                onChange={(evt) => {
                    setValue(evt.target.value)
                    onChange(evt.target.value)
                }}
                // @ts-ignore
                value={value}></textarea>
        </div>
    )
}
