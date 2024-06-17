"use client"
import React, { useMemo } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import styles from "../styles/AdminCMS.module.scss"

type TwoColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
        site: string
    }

export const TwoColumn: React.FC<TwoColumnProps> = (props: TwoColumnProps) => {
    const {
        id,
        isPreview,
        elements,
        isMobileView,
        isElementor,
        selfData,
        site
    } = props
    const parentProps = { isPreview, site }

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { two_column_bg_color } = values

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobileView ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: two_column_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap ${isMobileView ? "space-y-2" : ""} container`}>
                    {(elements ?? []).map((k, idx) => (
                        <div
                            className={`p-1 col-${isMobileView ? 12 : 6}`}
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
