import React from "react"
import { WidgetProps } from "../utils/type/index"

type RichTextProps = WidgetProps & {}

export const RichText: React.FC<RichTextProps> = ({ properties }) => {
    const labelItem = properties?.find((l) => l.label === "Label")
    const valueItem = properties?.find((l) => l.label === "Value")

    return (
        <div>
            <div className={`text-level-headline text-font-bold`}>
                {labelItem?.value}
            </div>
            <div dangerouslySetInnerHTML={{ __html: valueItem?.value ?? "" }} />
        </div>
    )
}
