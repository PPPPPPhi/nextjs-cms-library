"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import * as _ from "lodash"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import styles from "../styles/AdminCMS.module.scss"
import { useIsMobile } from "../../utils/useIsMobile"

type BSSColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
        site: string
    }

export const BSSColumn: React.FC<BSSColumnProps> = (props) => {
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
    const isMobile = useIsMobile()

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobile || isMobileView ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: bss_column_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap container ${isMobile || isMobileView ? "space-y-2" : ""}`}>
                    <div className={`col-${isMobile || isMobileView ? 12 : 6}`}>
                        {(BColumn ?? []).map((k) => (
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
                        className={`d-flex col-${isMobile || isMobileView ? 12 : 6}`}>
                        {(SColumn ?? []).map((k, idx) => (
                            <div className={`p-1 col-6`} style={{ flex: 1 }}>
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
