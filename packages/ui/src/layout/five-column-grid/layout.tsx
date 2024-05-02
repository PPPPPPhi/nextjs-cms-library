"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"

type FiveColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[] }
    }

export const FiveColumn: React.FC<FiveColumnProps> = (props) => {
    const { id, isPreview, selfData, elements, isElementor, isMobileView } =
        props

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    return (
        <div>
            <div
                className={`d-flex flex-wrap row`}
                style={{ minHeight: !isPreview ? 100 : "auto" }}>
                {(elements ?? []).map((k, idx) => (
                    <div
                        style={{
                            width: isMobileView ? "100%" : "20%",
                            paddingLeft: 0,
                            paddingRight: 0
                        }}
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
