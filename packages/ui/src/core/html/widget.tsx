"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"

type HTMLProps = WidgetProps & {}

export const HTML: React.FC<HTMLProps> = ({ label, placeholder, value }) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "HTML Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
