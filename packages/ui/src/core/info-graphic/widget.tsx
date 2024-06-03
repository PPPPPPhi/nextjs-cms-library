"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"

type InfoGraphicProps = WidgetProps & {}

export const InfoGraphic: React.FC<InfoGraphicProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "InfoGraphic Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
