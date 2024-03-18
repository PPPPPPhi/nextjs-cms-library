import React from "react"
import { WidgetProps } from "../utils/type/index"
import { FacebookSVG } from "./icon/FacebookSVG"
import { InstragramSVG } from "./icon/InstragramSVG"
import { XSVG } from "./icon/XSVG"
import { WhatsappSVG } from "./icon/WhatsappSVG"
import { YouTubeSVG } from "./icon/YouTubeSVG"

type SocialMediaProps = WidgetProps & {}

export const SocialMedia: React.FC<SocialMediaProps> = ({ properties }) => {
    const facebookUrl =
        properties?.find((property: any) => property.label === "Facebook url")
            ?.value ?? ""

    const instragramUrl =
        properties?.find((property: any) => property.label === "Instragram url")
            ?.value ?? ""

    const xUrl =
        properties?.find((property: any) => property.label === "X url")
            ?.value ?? ""

    const whatsappUrl =
        properties?.find((property: any) => property.label === "whatsapp url")
            ?.value ?? ""

    const youtubeUrl =
        properties?.find((property: any) => property.label === "YouTube url")
            ?.value ?? ""

    return (
        <div
            className="d-flex flex-wrap"
            style={{ overflowWrap: "break-word", flexDirection: "row" }}>
            <div>
                <a target="_blank" href={facebookUrl}>
                    <FacebookSVG height="50px" width="50px" />
                </a>
            </div>
            <div>
                <a target="_blank" href={instragramUrl}>
                    <InstragramSVG height="50px" width="50px" />
                </a>
            </div>
            <div>
                <a target="_blank" href={xUrl}>
                    <XSVG height="50px" width="50px" />
                </a>
            </div>
            <div>
                <a target="_blank" href={youtubeUrl}>
                    <YouTubeSVG height="50px" width="50px" />
                </a>
            </div>
        </div>
    )
}
