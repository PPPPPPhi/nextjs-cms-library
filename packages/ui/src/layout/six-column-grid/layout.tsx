"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import * as _ from "lodash"
import usePropertiesHook from "../../core/hook/usePropertiesHook"

type SixColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: {} }
    }

export const SixColumn: React.FC<SixColumnProps> = (props) => {
    const { id, isPreview, selfData, elements, isElementor, isMobileView } =
        props

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { six_column_bg_color } = values

    return (
        <div>
            <div
                className={`d-flex justify-content-center ${isMobileView ? styles.adminMobileCMSLayout : styles.adminCMSLayout}`}
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: six_column_bg_color ?? "inherit"
                }}>
                <div
                    className={`d-flex flex-wrap container ${isMobileView ? "space-y-2" : ""}`}>
                    {(elements ?? []).map((k, idx) => (
                        <div
                            className={`px-2 ${isMobileView ? "col-12" : "col-2"}`}
                            style={{
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
        </div>
    )
}
