import React from "react"
import { WidgetProps } from "../utils/type/index"

type ContactProps = WidgetProps & {}

export const Contact: React.FC<ContactProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Contact Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
