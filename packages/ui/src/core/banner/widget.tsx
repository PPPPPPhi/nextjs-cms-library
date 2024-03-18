import React from "react"
import { WidgetProps } from "../../core/utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useDisplayPanelContext } from "../../elementor"

type BannerProps = WidgetProps & {}

export const Banner: React.FC<BannerProps> = ({ properties }) => {
    const { site } = useDisplayPanelContext()

    const image = properties?.find((l: any) => l.label === "Image")?.value ?? ""
    const title = properties?.find((l: any) => l.label === "Title")?.value ?? ""
    const subTitle =
        properties?.find((l: any) => l.label === "SubTitle")?.value ?? ""
    const textColor =
        properties?.find((l: any) => l.label === "Text Color")?.value ?? ""
    const alignment =
        properties?.find((l: any) => l.label === "Alignment")?.value ?? ""

    return (
        <div
            className="w-100 d-flex position-relative"
            style={{ minHeight: 100 }}>
            <div className="w-100">
                {image && (
                    <PreviewSelectImage
                        site={site as string}
                        value={image as string}
                        handler={() => {}}
                    />
                )}
            </div>
            {image && (
                <div
                    className="position-absolute w-100 p-5"
                    style={{
                        bottom: 0,
                        textAlign: alignment ?? "start",
                        color: textColor ?? "#000"
                    }}>
                    <div className={`text-level-headline text-font-bold`}>
                        <span className="text-level-title">{title}</span>
                    </div>
                    <div className={`text-level-body`}>
                        <span>{subTitle}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
