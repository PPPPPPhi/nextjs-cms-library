"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import * as _ from "lodash"
import styles from "../styles/AdminCMS.module.scss"
import { useIsMobile } from "../../utils/useIsMobile"

type FiveColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
        site: string
    }

export const FiveColumn: React.FC<FiveColumnProps> = (props) => {
    const {
        id,
        isPreview,
        selfData,
        elements,
        isElementor,
        isMobileView,
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

    const isMobile = useIsMobile()
    const { five_column_bg_color } = values

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobileView || isMobile ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: five_column_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap  container ${isMobileView || isMobile ? "space-y-2" : ""}`}>
                    {(elements ?? []).map((k, idx) => (
                        <div
                            className="px-2"
                            style={{
                                width:
                                    isMobileView || isMobile ? "100%" : "20%",
                                paddingLeft: 0,
                                paddingRight: 0
                            }}
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
