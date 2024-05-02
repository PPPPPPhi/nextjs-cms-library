"use client"

import React from "react"
import { WidgetProps } from "../../core/utils/type/index"
import usePropertiesHook from "../hook/usePropertiesHook"
import {
    AdminButton,
    AdminSVGIcon
} from "@nextjs-cms-library/admin-components/index"
import { useRouter } from "next/navigation"

type SVGNavCardProps = WidgetProps & {}

export const SVGNavCard: React.FC<SVGNavCardProps> = ({ properties }) => {
    const { values } = usePropertiesHook(properties)

    const router = useRouter()

    const {
        svg_nav_card_title,
        svg_nav_card_description,
        svg_nav_card_icon,
        svg_nav_card_destination
    } = values

    return (
        <div className="d-flex flex-column text-center align-items-center space-y-3 w-100">
            <span
                className="text-level-subtitle text-font-bold"
                style={{ minHeight: 81 }}>
                {svg_nav_card_title}
            </span>
            <AdminSVGIcon
                style={{
                    flex: 1,
                    minWidth: 80,
                    height: 80,
                    color: "var(--static-color-primary)"
                }}
                svgName={svg_nav_card_icon}
            />
            <span className="text-level-body">{svg_nav_card_description}</span>
            <div
                className="w-100"
                style={{ height: 1, background: "#CFCFCF" }}></div>
            <AdminButton
                label="VIEW MORE"
                onClick={() => {
                    router.push(svg_nav_card_destination)
                }}
            />
        </div>
    )
}
