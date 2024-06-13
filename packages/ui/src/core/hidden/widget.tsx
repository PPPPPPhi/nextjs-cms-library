"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"

type HiddenProps = WidgetProps & {}

export const Hidden: React.FC<HiddenProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Hidden Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
