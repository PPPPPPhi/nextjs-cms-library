"use client"
import React, { useMemo } from "react"
import _ from "lodash"
import "./style.scss"
import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { useMultiColumnsContext } from "../index"
import { SubColumn, ElementorSubColumn } from "../common/index"
import usePropertiesHook from "../../core/hook/usePropertiesHook"

type BentoGridProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        isMobileView?: boolean
        isElementor?: boolean
        selfData?: { children: any[]; properties: any }
    }

export const BentoGrid: React.FC<BentoGridProps> = (props: BentoGridProps) => {
    const { id, isPreview, selfData, elements, isElementor, isMobileView } =
        props

    const { values } = usePropertiesHook(
        props.selfData?.properties ?? props.properties
    )
    const { bento_bg_color } = values

    const childrenValues = useMemo(() => {
        return selfData?.children ?? []
    }, [selfData])

    const SubComponent = isElementor ? ElementorSubColumn : SubColumn
    const { focusEditId, setFocusEditId } = useMultiColumnsContext()
    const updateFocusEditComponent = () => {
        setFocusEditId({ ...focusEditId, id, childType: "parent" })
    }

    const BENTO_CLASS = [
        "single-row-1",
        "single-row-2",
        "single-row-spancol",
        "span-row",
        "single-row-spancol-2",
        "single-row",
        "single-row-spancol-3",
        "single-row"
    ]

    return (
        <div
            style={{ backgroundColor: bento_bg_color }}
            className="bento-grid-style"
            onClick={() => updateFocusEditComponent()}>
            <div className={`p-1 col-12`}>
                <div
                    className={`${isMobileView ? "mobile" : "desktop"}`}
                    style={{ minHeight: !isPreview ? "150px" : "auto" }}>
                    {(elements ?? []).map((k, idx) => (
                        <div className={BENTO_CLASS[idx]}>
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
