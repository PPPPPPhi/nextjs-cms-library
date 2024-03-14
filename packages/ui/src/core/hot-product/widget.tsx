import React from "react"
import { WidgetProps } from "../utils/type/index"

type HotProductProps = WidgetProps & {}

export const HotProduct: React.FC<HotProductProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "HotProduct Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
