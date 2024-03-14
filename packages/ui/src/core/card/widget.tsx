import React from "react"
import { WidgetProps } from "../utils/type/index"

type CardProps = WidgetProps & {}

export const Card: React.FC<CardProps> = ({ label, placeholder, value }) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Card Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
