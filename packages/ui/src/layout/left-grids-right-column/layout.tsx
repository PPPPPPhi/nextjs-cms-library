"use client"
import React, { useMemo } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"

type LeftGridsRightColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[] }
    }

export const LeftGridsRightColumn: React.FC<LeftGridsRightColumnProps> = (
    props: LeftGridsRightColumnProps
) => {
    const { id, isPreview, selfData, elements, isElementor, isMobileView } =
        props

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    const leftColumn = useMemo(() => {
        return [...(elements ?? [])]?.splice(0, 2) ?? []
    }, [elements])

    const rightColumn = useMemo(() => {
        return [...(elements ?? [])]?.splice(2, 1) ?? []
    }, [elements])

    return (
        <div>
            <div
                className={`d-flex flex-wrap`}
                style={{ minHeight: !isPreview ? 100 : "auto" }}>
                <div
                    className={`d-flex flex-column col-${isMobileView ? 12 : 6}`}>
                    {(leftColumn ?? []).map((k, idx) => (
                        <div className={`p-1`} style={{ flex: 1 }}>
                            <SubComponent
                                {..._.merge(k, childrenValues[idx])}
                                parentId={id}
                                isPreview={isPreview}
                            />
                        </div>
                    ))}
                </div>
                <div className={`col-${isMobileView ? 12 : 6}`}>
                    {(rightColumn ?? []).map((k) => (
                        <div className="h-100 p-1" style={{ flex: 1 }}>
                            <SubComponent
                                {..._.merge(k, childrenValues[2])}
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
