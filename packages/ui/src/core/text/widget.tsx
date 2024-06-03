"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"
import usePropertiesHook from "../hook/usePropertiesHook"

type TextProps = WidgetProps & {}

export const Text: React.FC<TextProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)

    const {
        text_label,
        text_label_alignment,
        text_label_color,
        text_value,
        text_value_alignment,
        text_value_color
    } = values ?? {}

    return (
        <div className="w-100" style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                <p
                    className={`text-${text_label_alignment}`}
                    style={{ color: text_label_color }}>
                    {text_label}
                </p>
            </div>
            <div className={`text-level-body`}>
                <p
                    className={`text-${text_value_alignment}`}
                    style={{ color: text_value_color }}>
                    {text_value}
                </p>
            </div>
        </div>
    )
}
