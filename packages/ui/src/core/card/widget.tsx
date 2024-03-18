import React from "react"
import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useDisplayPanelContext } from "../../elementor"

type CardProps = WidgetProps & {}

export const Card: React.FC<CardProps> = ({ properties }) => {
    const { site } = useDisplayPanelContext()

    const title = properties?.find((l: any) => l.label === "Title")?.value ?? ""
    const subTitle =
        properties?.find((l: any) => l.label === "SubTitle")?.value ?? ""
    const desc =
        properties?.find((l: any) => l.label === "Description")?.value ?? ""
    const textColor =
        properties?.find((l: any) => l.label === "Text Color")?.value ?? ""
    const backgroundColor =
        properties?.find((l: any) => l.label === "Background Color")?.value ??
        ""
    const image = properties?.find((l: any) => l.label === "Image")?.value ?? ""

    return (
        <div className="p-3 w-100">
            <div
                className="w-100 d-flex flex-column shadow rounded-2 p-2"
                style={{
                    overflowWrap: "break-word",
                    color: textColor ?? "#FFFFFF",
                    background: backgroundColor ?? "white"
                }}>
                <div className="w-100" style={{ flex: 1 }}>
                    {image && (
                        <PreviewSelectImage
                            height={300}
                            site={site as string}
                            value={image as string}
                            handler={() => {}}
                        />
                    )}
                </div>
                <div className={`text-level-headline text-font-bold py-2`}>
                    {title}
                </div>
                <div className={`text-level-body`}>{subTitle}</div>
                <div className={`text-level-remark text-font-light`}>
                    {desc}
                </div>
            </div>
        </div>
    )
}
