import React from "react"
import { WidgetProps } from "../../utils/index"

type TextProps = WidgetProps & {}

export const Text: React.FC<TextProps> = ({ label, placeholder, value }) => {
    return (
        <div>
            <div>{label ?? "Text Label"}</div>
            <input
                type="text"
                id="text"
                name={value ?? placeholder ?? "Input ..."}
            />
        </div>
    )
}
