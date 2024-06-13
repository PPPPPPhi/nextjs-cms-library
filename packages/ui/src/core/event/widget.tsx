"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"

type EventProps = WidgetProps & {}

export const Event: React.FC<EventProps> = ({ label, placeholder, value }) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Event Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
