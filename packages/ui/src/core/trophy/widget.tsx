"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"

type TrophyProps = WidgetProps & {}

export const Trophy: React.FC<TrophyProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Widget Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
