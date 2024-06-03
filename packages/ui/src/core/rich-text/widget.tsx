"use client"
import React from "react"
import { WidgetProps } from "../utils/type/index"
import "./style.scss"
import usePropertiesHook from "../hook/usePropertiesHook"

type RichTextProps = WidgetProps & {}

export const RichText: React.FC<RichTextProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)

    const { rich_text_title, rich_text_value } = values

    return (
        <div>
            <div className={`text-level-headline text-font-bold`}>
                {rich_text_title}
            </div>
            <div
                className="richtext-container"
                dangerouslySetInnerHTML={{ __html: rich_text_value ?? "" }}
            />
        </div>
    )
}
