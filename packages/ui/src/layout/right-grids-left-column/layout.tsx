"use client"
import React, { Ref, useMemo, useState, useEffect } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"

type RightGridsLeftColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[] }
    }

export const RightGridsLeftColumn: React.FC<RightGridsLeftColumnProps> = (
    props: RightGridsLeftColumnProps
) => {
    const { id, isPreview, selfData, elements, isElementor, isMobileView } =
        props

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    const leftColumn = useMemo(() => {
        return [...(elements ?? [])]?.splice(0, 1) ?? []
    }, [elements])

    const rightColumn = useMemo(() => {
        return [...(elements ?? [])]?.splice(1, 2) ?? []
    }, [elements])

    return (
        <div>
            <div
                className={`d-flex flex-wrap`}
                style={{ minHeight: !isPreview ? "150px" : "auto" }}>
                <div className={`col-${isMobileView ? 12 : 6}`}>
                    {(leftColumn ?? []).map((k) => (
                        <div className="h-100 p-1" style={{ flex: 1 }}>
                            <SubComponent
                                {..._.merge(k, childrenValues[0])}
                                parentId={id}
                                isPreview={isPreview}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={`d-flex flex-column col-${isMobileView ? 12 : 6}`}>
                    {(rightColumn ?? []).map((k, idx) => (
                        <div className={`p-1`} style={{ flex: 1 }}>
                            <SubComponent
                                {..._.merge(k, childrenValues[idx + 1])}
                                parentId={id}
                                isPreview={isPreview}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
