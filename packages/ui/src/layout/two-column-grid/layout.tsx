"use client"
import React, { useMemo } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"

type TwoColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
    }

export const TwoColumn: React.FC<TwoColumnProps> = (props: TwoColumnProps) => {
    const { id, isPreview, elements, isMobileView, isElementor, selfData } =
        props

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { two_column_bg_color } = values
    console.log("pppv 1", props)
    console.log("pppv 2", values)

    return (
        <div>
            <div
                className={`d-flex flex-wrap`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: two_column_bg_color ?? "inherit"
                }}>
                {(elements ?? []).map((k, idx) => (
                    <div
                        className={`p-1 col-${isMobileView ? 12 : 6}`}
                        key={`${id}-${idx}`}>
                        <SubComponent
                            {..._.merge(k, childrenValues[idx])}
                            parentId={id}
                            isPreview={isPreview}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
