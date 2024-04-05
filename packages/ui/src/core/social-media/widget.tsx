import React from "react"
import { WidgetProps } from "../utils/type/index"
import { FacebookSVG } from "./icon/FacebookSVG"
import { InstragramSVG } from "./icon/InstragramSVG"
import { XSVG } from "./icon/XSVG"
import { WhatsappSVG } from "./icon/WhatsappSVG"
import { YouTubeSVG } from "./icon/YouTubeSVG"
import usePropertiesHook from "../hook/usePropertiesHook"

type SocialMediaProps = WidgetProps & {}

export const SocialMedia: React.FC<SocialMediaProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)

    const {
        social_media_facebook,
        social_media_instagram,
        social_media_x,
        social_media_whatsapp,
        social_media_youtube
    } = values

    return (
        <div
            className="d-flex flex-wrap"
            style={{ overflowWrap: "break-word", flexDirection: "row" }}>
            <div>
                <a target="_blank" href={social_media_facebook}>
                    <FacebookSVG height="50px" width="50px" />
                </a>
            </div>
            <div>
                <a target="_blank" href={social_media_instagram}>
                    <InstragramSVG height="50px" width="50px" />
                </a>
            </div>
            <div>
                <a target="_blank" href={social_media_x}>
                    <XSVG height="50px" width="50px" />
                </a>
            </div>
            <div>
                <a target="_blank" href={social_media_youtube}>
                    <YouTubeSVG height="50px" width="50px" />
                </a>
            </div>
        </div>
    )
}
