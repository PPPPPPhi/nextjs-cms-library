import React from "react"
import { WidgetProps } from "../../core/utils/type/index"

type BannerProps = WidgetProps & {}

export const Banner: React.FC<BannerProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Banner Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
