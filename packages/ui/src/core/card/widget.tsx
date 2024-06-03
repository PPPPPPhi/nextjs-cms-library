"use client"

import React from "react"
import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useParams } from "next/navigation"
import usePropertiesHook from "../hook/usePropertiesHook"

type CardProps = WidgetProps & {}

export const Card: React.FC<CardProps> = ({ properties }) => {
    const { site } = useParams() ?? {}
    const { values } = usePropertiesHook(properties)

    const {
        card_label,
        card_image_src,
        card_subtitle,
        card_description,
        card_text_color,
        card_background_color,
        card_image_position
    } = values

    return (
        <div className="w-100 h-100">
            <div
                className="w-100 h-100 d-flex flex-column shadow-sm rounded-2 p-2"
                style={{
                    overflowWrap: "break-word",
                    color: card_text_color ?? "#FFFFFF",
                    background: card_background_color ?? "white"
                }}>
                <div className="w-100 overflow-hidden" style={{borderRadius:15}}>
                    {card_image_src && (
                        <PreviewSelectImage
                            height={300}
                            site={site as string}
                            value={card_image_src as string}
                            handler={() => {}}
                            position={card_image_position}
                        />
                    )}
                </div>
                <div className="p-3" style={{ flex: 1 }}>
                    <div className={`text-level-headline text-font-bold py-2`}>
                        {card_label}
                    </div>
                    <div className={`text-level-body`}>{card_subtitle}</div>
                    <div className={`text-level-remark text-font-light`}>
                        {card_description}
                    </div>
                </div>
            </div>
        </div>
    )
}
