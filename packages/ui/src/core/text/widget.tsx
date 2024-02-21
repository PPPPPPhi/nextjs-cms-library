import React from "react"
import { WidgetProps } from "../../utils/index"

type TextProps = WidgetProps & {}

export const Text: React.FC<TextProps> = ({ label, placeholder, value }) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Text Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
