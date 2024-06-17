"use client"
import React, { Ref, useMemo, useState, useEffect } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import styles from "../styles/AdminCMS.module.scss"

type RightGridsLeftColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
        site: string
    }

export const RightGridsLeftColumn: React.FC<RightGridsLeftColumnProps> = (
    props: RightGridsLeftColumnProps
) => {
    const {
        id,
        isPreview,
        selfData,
        elements,
        isElementor,
        site,
        isMobileView
    } = props
    const parentProps = { isPreview, site }

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

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { rglc_bg_color } = values

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobileView ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: rglc_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap container ${isMobileView ? "space-y-2" : ""}`}>
                    <div className={`col-${isMobileView ? 12 : 6}`}>
                        {(leftColumn ?? []).map((k) => (
                            <div className="h-100 p-1" style={{ flex: 1 }}>
                                <SubComponent
                                    {..._.merge(k, childrenValues[0])}
                                    parentId={id}
                                    {...parentProps}
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
                                    {...parentProps}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
