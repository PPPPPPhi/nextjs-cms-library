"use client"

import React from "react"
import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import usePropertiesHook from "../hook/usePropertiesHook"
import { useParams } from "next/navigation"

type SponsorProps = WidgetProps & { isPreview: boolean }

export const Sponsor: React.FC<SponsorProps> = ({
    properties,
    site,
    isPreview
}) => {
    const { values } = usePropertiesHook(properties)

    const { sponsor_title, sponsor_image_list } = values

    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {sponsor_title}
            </div>
            <div className="d-flex flex-wrap">
                {(sponsor_image_list ?? [])?.map(
                    (l: {
                        value: string
                        alt: string
                        destination: string
                    }) => (
                        <div className="col-2 p-2">
                            <PreviewSelectImage
                                site={site as string}
                                value={l?.value}
                                handler={() => {}}
                                alt={l.alt}
                                destination={isPreview ? l.destination : ""}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
