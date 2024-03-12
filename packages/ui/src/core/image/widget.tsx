import React, { useEffect } from "react"
import { ImageApdator } from "../common/imageLoader"

import { useParams, useRouter } from "next/navigation"
import { NextImageApdator } from "../../utils/index"
import { WidgetProps } from "../utils/type/index"

type ImageProps = WidgetProps & {}

export const Image: React.FC<ImageProps> = ({ label, placeholder, value }) => {
    const { site, pageId } = useParams()

    const getPreviewImage = () => {
        // given stored imageId
    }

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
                    <div
                        className="col-12 col-md-4 position-relative"
                        style={{
                            width: "auto",
                            height: 300
                        }}>
                        <ImageApdator
                            src={`${process.env.NEXT_IMAGE_UPLOAD_PATH}/${site}${value}`}
                            alt="profile"
                            isStatic
                            fill
                            style={{
                                objectFit: "contain",
                                objectPosition: "center"
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
