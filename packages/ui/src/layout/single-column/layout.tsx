"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import * as _ from "lodash"
import styles from "../styles/AdminCMS.module.scss"

type SingleColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
        site: string
    }

export const SingleColumn: React.FC<SingleColumnProps> = (props) => {
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
    const { single_column_bg_color } = values

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobileView ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: single_column_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap container ${isMobileView ? "space-y-2" : ""}`}>
                    <div
                        className="px-2 w-100"
                        style={{
                            paddingLeft: 0,
                            paddingRight: 0
                        }}>
                        <SubComponent
                            {..._.merge(elements?.[0], childrenValues?.[0])}
                            parentId={id}
                            {...parentProps}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
