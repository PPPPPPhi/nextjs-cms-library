import React from "react"
import { WidgetProps } from "../utils/type/index"

type SocialMediaProps = WidgetProps & {}

export const SocialMedia: React.FC<SocialMediaProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "SocialMedia Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
