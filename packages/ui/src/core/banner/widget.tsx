import React from "react"
import { WidgetProps } from "../../core/utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useParams } from "next/navigation"
import usePropertiesHook from "../hook/usePropertiesHook"

type BannerProps = WidgetProps & {}

export const Banner: React.FC<BannerProps> = ({ properties }) => {
    const { site } = useParams()
    const { values } = usePropertiesHook(properties)

    const {
        banner_title,
        banner_subtitle,
        banner_text_color,
        banner_alignment,
        banner_image_src
    } = values

    return (
        <div
            className="w-100 d-flex position-relative"
            style={{ minHeight: 100 }}>
            <div className="w-100">
                {banner_image_src && (
                    <PreviewSelectImage
                        site={site as string}
                        value={banner_image_src as string}
                        handler={() => {}}
                    />
                )}
            </div>

            <div
                className="position-absolute w-100 p-5"
                style={{
                    bottom: 0,
                    textAlign: banner_alignment ?? "start",
                    color: banner_text_color ?? "#000"
                }}>
                <div className={`text-level-headline text-font-bold`}>
                    <span className="text-level-title">{banner_title}</span>
                </div>
                <div className={`text-level-body`}>
                    <span>{banner_subtitle}</span>
                </div>
            </div>
        </div>
    )
}
