import React, { useEffect } from "react"

import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useDisplayPanelContext } from "../../elementor"

type ImageProps = WidgetProps & {}

export const Image: React.FC<ImageProps> = ({ properties }) => {
    const { site } = useDisplayPanelContext()
    const label = properties?.find((l: any) => l.label === "Label")?.value ?? ""
    const valueItem = properties?.find((l: any) => l.label === "Image")
    const alignment =
        properties?.find((l: any) => l.label === "Alignment")?.value ?? "center"
    const position =
        properties?.find((l: any) => l.label === "Position")?.value ?? "contain"

    return (
        <div className="w-100" style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>{label}</div>

            {valueItem?.value && (
                <div className="col-12 col-md-4 position-relative h-100 w-100">
                    <PreviewSelectImage
                        position={position}
                        alignment={alignment}
                        site={site as string}
                        value={valueItem?.value as string}
                        handler={() => {}}
                    />
                </div>
            )}
        </div>
    )
}
