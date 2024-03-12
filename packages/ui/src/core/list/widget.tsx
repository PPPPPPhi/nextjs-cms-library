import React from "react"
import { WidgetProps } from "../utils/type/index"

type ListProps = WidgetProps & {}

export const List: React.FC<ListProps> = ({ label, placeholder, value }) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "List Label"}
            </div>

            <div className={`text-level-body`}>{value ?? placeholder}</div>
        </div>
    )
}
