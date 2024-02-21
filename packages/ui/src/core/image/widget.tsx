import React from "react"
import { WidgetProps } from "../../utils/index"

type ImageProps = WidgetProps & {}

export const Image: React.FC<ImageProps> = ({ label, placeholder, value }) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Image Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
