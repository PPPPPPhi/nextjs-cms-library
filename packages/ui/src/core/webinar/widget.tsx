import React from "react"
import { WidgetProps } from "../utils/type/index"

type WebinarProps = WidgetProps & {}

export const Webinar: React.FC<WebinarProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Webinar Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
