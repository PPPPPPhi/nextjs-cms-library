import React from "react"
import { WidgetProps } from "../utils/type/index"

type TextProps = WidgetProps & {}

export const Text: React.FC<TextProps> = ({ properties }) => {
    const labelItem = properties?.find((l) => l.label === "Label")
    const valueItem = properties?.find((l) => l.label === "Value")

    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {labelItem?.value ?? "Text Label"}
            </div>

            <div className={`text-level-body`}>
                {valueItem?.value ?? valueItem?.placeholder}
            </div>
        </div>
    )
}
