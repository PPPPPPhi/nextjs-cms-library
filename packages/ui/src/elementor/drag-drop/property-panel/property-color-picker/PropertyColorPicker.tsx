"use client"

import { HexColorPicker } from "react-colorful"
import { useState, useEffect } from "react"

interface PropertyColorPickerInterface {
    defaultValue: string
    onChange: (color: string) => void
}

export const PropertyColorPicker: React.FC<PropertyColorPickerInterface> = ({
    defaultValue,
    onChange
}) => {
    const [color, setColor] = useState("")
    const [isSettle, setIsSettle] = useState<boolean>(false)

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setColor(defaultValue)
            setIsSettle(true)
        }
    }, [defaultValue])

    return (
        <div className="d-flex p-2 align-items-center justify-content-center">
            <HexColorPicker
                color={color}
                onChange={(v) => {
                    setColor(v)
                    onChange(v)
                }}
            />
        </div>
    )
}
