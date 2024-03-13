import React, { useEffect } from "react"

import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useDisplayPanelContext } from "../../elementor"

type ImageProps = WidgetProps & {}

export const Image: React.FC<ImageProps> = ({ label, placeholder, value }) => {
    const { site } = useDisplayPanelContext()

    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {label ?? "Image Label"}
            </div>

            {value && (
                <div
                    className="col-12 col-md-4 position-relative"
                    style={{
                        width: "auto",
                        height: 300
                    }}>
                    <PreviewSelectImage
                        site={site as string}
                        value={value as string}
                        handler={() => {}}
                    />
                </div>
            )}
        </div>
    )
}
