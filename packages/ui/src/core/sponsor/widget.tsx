"use client"

import React from "react"
import { WidgetProps } from "../utils/type/index"
import { PreviewSelectImage } from "../utils"
import usePropertiesHook from "../hook/usePropertiesHook"
import { useParams } from "next/navigation"

type SponsorProps = WidgetProps & {}

export const Sponsor: React.FC<SponsorProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)
    const { site } = useParams()

    const { sponsor_title, sponsor_image_list } = values

    return (
        <div style={{ overflowWrap: "break-word" }}>
            <div className={`text-level-headline text-font-bold`}>
                {sponsor_title}
            </div>
            <div className="d-flex flex-wrap">
                {(sponsor_image_list ?? [])?.map((l: string) => (
                    <div className="col-2 p-2">
                        <PreviewSelectImage
                            site={site as string}
                            value={l as string}
                            handler={() => {}}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
