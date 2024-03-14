import React from "react"
import { WidgetProps } from "../utils/type/index"

type RichTextProps = WidgetProps & {}

export const RichText: React.FC<RichTextProps> = ({
    label,
    placeholder,
    value
}) => {
    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div dangerouslySetInnerHTML={{ __html: value ?? "" }} />
        </div>
    )
}
