import React, { useEffect } from "react"

import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import usePropertiesHook from "../hook/usePropertiesHook"
import { useParams } from "next/navigation"

type ImageProps = WidgetProps & {}

export const Image: React.FC<ImageProps> = ({ properties }) => {
    const { site } = useParams()

    const { values } = usePropertiesHook(properties)
    const { image_label, image_src, image_alignment, image_position } =
        values ?? {}

    return (
        <div className="w-100" style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {image_label}
            </div>

            {image_src && (
                <div className="col-12 col-md-4 position-relative h-100 w-100">
                    <PreviewSelectImage
                        position={image_position}
                        alignment={image_alignment}
                        site={site as string}
                        value={image_src as string}
                        handler={() => {}}
                    />
                </div>
            )}
        </div>
    )
}
