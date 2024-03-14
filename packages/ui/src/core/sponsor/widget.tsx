import React from "react"
import { WidgetProps } from "../utils/type/index"

type SponsorProps = WidgetProps & {}

export const Sponsor: React.FC<SponsorProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Sponsor Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
