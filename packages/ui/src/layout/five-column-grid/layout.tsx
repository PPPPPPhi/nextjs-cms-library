"use client"
import React, { useMemo } from "react"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"
import * as _ from "lodash"

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
    const { five_column_bg_color } = values

    return (
        <div>
            <div
                className="d-flex justify-content-center"
                style={{
                    minHeight: !isPreview ? 100 : "auto",
                    backgroundColor: five_column_bg_color ?? "inherit",
                    padding: isMobileView ? "20px 0px" : "50px 0px"
                }}>
                <div
                    className={`d-flex flex-wrap  container ${isMobileView ? "space-y-2" : ""}`}>
                    {(elements ?? []).map((k, idx) => (
                        <div
                            className="px-2"
                            style={{
                                width: isMobileView ? "100%" : "20%",
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
