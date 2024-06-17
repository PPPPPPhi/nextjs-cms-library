"use client"
import React, { useMemo } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import styles from "../styles/AdminCMS.module.scss"

type ThreeColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
        site: string
    }

export const ThreeColumn: React.FC<ThreeColumnProps> = (
    props: ThreeColumnProps
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

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { three_column_bg_color } = values

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobileView ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: three_column_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap container ${isMobileView ? "space-y-2" : ""}`}>
                    {(elements ?? []).map((k, idx) => (
                        <div
                            className={`p-1 col-${isMobileView ? 12 : 4}`}
                            key={`${id}-${idx}`}>
                            <SubComponent
                                {..._.merge(k, childrenValues[idx])}
                                parentId={id}
                                {...parentProps}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
