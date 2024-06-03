"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import * as _ from "lodash"
import usePropertiesHook from "../../core/hook/usePropertiesHook"

type BSSColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
    }

export const BSSColumn: React.FC<BSSColumnProps> = (props) => {
    const { id, isPreview, selfData, elements, isElementor, isMobileView } =
        props

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    const BColumn = useMemo(() => {
        return [...(elements ?? [])]?.splice(0, 1) ?? []
    }, [elements])

    const SColumn = useMemo(() => {
        return [...(elements ?? [])]?.splice(1, 2) ?? []
    }, [elements])

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { bss_column_bg_color } = values

    return (
        <div>
            <div
                className="d-flex justify-content-center"
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: bss_column_bg_color ?? "inherit",
                    padding: isMobileView ? "20px 0px" : "50px 0px"
                }}>
                <div
                    className={`d-flex flex-wrap container ${isMobileView ? "space-y-2" : ""}`}>
                    <div className={`col-${isMobileView ? 12 : 6}`}>
                        {(BColumn ?? []).map((k) => (
                            <div className="h-100 p-1" style={{ flex: 1 }}>
                                <SubComponent
                                    {..._.merge(k, childrenValues[0])}
                                    parentId={id}
                                    isPreview={isPreview}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={`d-flex col-${isMobileView ? 12 : 6}`}>
                        {(SColumn ?? []).map((k, idx) => (
                            <div className={`p-1 col-6`} style={{ flex: 1 }}>
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
        </div>
    )
}
