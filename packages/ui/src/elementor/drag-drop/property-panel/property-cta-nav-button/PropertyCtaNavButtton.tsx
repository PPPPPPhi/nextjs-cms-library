"use client"

import { useState, useEffect } from "react"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponentProps } from "../../../../utils/index"
import { UseFormSetValue } from "react-hook-form"
import { PropertyImageSelector } from "../property-image-selector"
import { PropertyText } from "../property-text"
import { PropertySelector } from "../property-selector"

interface PropertyCtaNavButtonInterface {
    defaultValue?: CtaNavButtonType
    onChange?: UseFormSetValue<PropertiesComponentProps>
}

export type CtaNavButtonType = {
    label: string
    destination: string
}

export const PropertyCtaNavButton: React.FC<PropertyCtaNavButtonInterface> = ({
    defaultValue,
    onChange
}) => {
    const [ctaBtn, setCtaBtn] = useState<CtaNavButtonType>()
    const [isSettle, setIsSettle] = useState<boolean>(false)

    useEffect(() => {
        if (!isSettle && defaultValue) {
            setCtaBtn(defaultValue ?? {})
            setIsSettle(true)
        }
    }, [defaultValue])

    const updateCTASetting = (field: string, v: string) => {
        const btn = { ...ctaBtn }
        setCtaBtn((s) => ({ ...(s as CtaNavButtonType), [field]: v }))
    }

    useEffect(() => {
        onChange(ctaBtn)
    }, [ctaBtn])

    return (
        <div>
            <span>CTA Button Name</span>
            <PropertyText
                defaultValue={ctaBtn?.label ?? ""}
                onChange={(v) => {
                    updateCTASetting("label", v)
                }}
            />
            <span>CTA Button Destination</span>
            <PropertyText
                defaultValue={ctaBtn?.destination ?? ""}
                onChange={(v) => {
                    updateCTASetting("destination", v)
                }}
            />
        </div>
    )
}
