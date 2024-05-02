import React from "react"
import { WidgetProps } from "../utils/type/index"
import usePropertiesHook from "../hook/usePropertiesHook"

type SloganProps = WidgetProps & {}

export const Slogan: React.FC<SloganProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)

    const { slogan_title, slogan_description } = values

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: 350 }}>
            <div
                className="richtext-container"
                dangerouslySetInnerHTML={{ __html: slogan_title ?? "" }}
            />

            <div
                className={`text-level-body text-font-normal text-center`}
                style={{ marginTop: 50 }}>
                {slogan_description}
            </div>
        </div>
    )
}
