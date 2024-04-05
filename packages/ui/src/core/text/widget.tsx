import React from "react"
import { WidgetProps } from "../utils/type/index"
import usePropertiesHook from "../hook/usePropertiesHook"

type TextProps = WidgetProps & {}

export const Text: React.FC<TextProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)

    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {values?.text_label}
            </div>
            <div className={`text-level-body`}>{values?.text_value}</div>
        </div>
    )
}
