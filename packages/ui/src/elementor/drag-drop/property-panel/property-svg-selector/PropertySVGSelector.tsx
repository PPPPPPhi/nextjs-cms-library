"use client"

import {
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
            title: "Role Selection",
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
        <div className="d-flex w-100 align-items-center">
            <div style={{ flex: 1 }}>
                <AdminButton
                    style={{ width: "100%" }}
                    onClick={() => {
                        chooseSVG()
                    }}
                    label="Please Select a SVG"
                />
            </div>
            {icon && (
                <div className="px-2">
                    <AdminSVGIcon svgName={icon} />
                </div>
            )}
        </div>
    )
}
