import React from "react"
import { WidgetProps } from "../utils/type/index"
import "./style.scss"

type RichTextProps = WidgetProps & {}

export const RichText: React.FC<RichTextProps> = ({ properties }) => {
    const labelItem = properties?.find((l: any) => l.label === "Label")
    const valueItem = properties?.find((l: any) => l.label === "Value")

    return (
        <div>
            <div className={`text-level-headline text-font-bold`}>
                {labelItem?.value}
            </div>
            <div className="richtext-container" dangerouslySetInnerHTML={{ __html: valueItem?.value ?? "" }} />
        </div>
    )
}
