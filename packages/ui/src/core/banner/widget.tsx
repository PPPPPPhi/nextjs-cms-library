"use client"

import React from "react"
import { WidgetProps } from "../../core/utils/type/index"
import { PreviewSelectImage } from "../utils"
import { useParams, useRouter } from "next/navigation"
import usePropertiesHook from "../hook/usePropertiesHook"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"

type BannerProps = WidgetProps & {}

export const Banner: React.FC<BannerProps> = ({ properties, site }) => {
    const { values } = usePropertiesHook(properties)
    const router = useRouter()

    const {
        banner_title,
        banner_subtitle,
        banner_description,
        banner_text_color,
        banner_alignment,
        banner_image_src,
        banner_cta_btn_left,
        banner_cta_btn_right,
        banner_size
    } = values

    const getBannerSize = (size: "small" | "medium" | "large" | "full") => {
        switch (size) {
            case "small":
                return 400
            case "medium":
                return 500
            case "large":
                return 750
            case "full":
                return 900
        }
    }

    return (
        <div
            className="w-100 d-flex  position-relative"
            style={{ minHeight: getBannerSize(banner_size) }}>
            <div className="w-100">
                {banner_image_src && (
                    <PreviewSelectImage
                        site={site as string}
                        value={banner_image_src as string}
                        handler={() => {}}
                        style={{ objectFit: "cover" }}
                    />
                )}
            </div>

            <div
                className={`banner position-absolute w-100 p-5 d-flex flex-column align-items-${banner_alignment ?? "start"}`}
                style={{
                    top: "30%",
                    color: banner_text_color ?? "#000",
                    textAlign: banner_alignment ?? "start"
                }}>
                <div className={`text-level-headline text-font-bold`}>
                    <span className="text-level-super-title">
                        {banner_title}
                    </span>
                </div>
                <div className={`text-level-title`}>
                    <span>{banner_subtitle}</span>
                </div>
                <div className={`text-level-subtitle w-50`}>
                    <span>{banner_description}</span>
                </div>
                <div
                    className="space-x-3 d-flex"
                    style={{
                        padding: "20px 0 20px 0",
                        justifyContent: banner_alignment
                    }}>
                    {banner_cta_btn_left?.label && (
                        <AdminButton
                            label={banner_cta_btn_left?.label}
                            onClick={() => {
                                if (banner_cta_btn_left?.destination)
                                    router.push(
                                        banner_cta_btn_left?.destination
                                    )
                            }}
                            style={{
                                borderRadius: 12
                            }}
                        />
                    )}
                    {banner_cta_btn_right?.label && (
                        <AdminButton
                            label={banner_cta_btn_right?.label}
                            onClick={() => {
                                if (banner_cta_btn_right?.destination)
                                    router.push(
                                        banner_cta_btn_right?.destination
                                    )
                            }}
                            style={{
                                borderRadius: 12
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
