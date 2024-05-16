"use client"

import {
    AdminActionButton,
    AdminButton,
    AdminSVGIcon,
    useAdminContext
} from "@nextjs-cms-library/admin-components/index"
import { useState, useRef, useEffect } from "react"
import { PropertySVGForm } from "./PropertySVGForm"

interface PropertySVGSelector {
    defaultValue?: any
    onChange: (value: any) => void
}

export const PropertySVGSelector: React.FC<PropertySVGSelector> = ({
    defaultValue,
    onChange
}) => {
    const { setModal } = useAdminContext()
    const svgRef = useRef<any>()

    const [isSettle, setIsSettle] = useState<boolean>(false)
    const [icon, setIcon] = useState()

    useEffect(() => {
        if (!isSettle && defaultValue) {
            // @ts-ignore
            setIcon(defaultValue)
            setIsSettle(true)
        }
    }, [defaultValue])

    useEffect(() => {
        onChange(icon)
    }, [icon])

    const chooseSVG = () => {
        setModal({
            title: "Select a SVG",
            content: (
                <PropertySVGForm
                    onFormValueChange={(v) => {
                        svgRef.current = v
                    }}
                    defaultValue=""
                />
            ),
            confirmCTAText: "Confirm",
            confirmHandler: () => {
                setIcon(svgRef.current)
            },
            pannelWidth: 75,
            pannelHeight: 75
        })
    }

    return (
        <div className="d-flex flex-column w-100 space-y-2">
            <div style={{ flex: 1 }}>
                <AdminActionButton
                    onClick={() => {
                        chooseSVG()
                    }}
                    label="Select a SVG"
                />
            </div>
            {icon && (
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 12,
                        border: "1px solid var(--static-bg-boundary)"
                    }}>
                    <AdminSVGIcon
                        svgName={icon}
                        style={{ width: 50, height: 50 }}
                    />
                </div>
            )}
        </div>
    )
}
