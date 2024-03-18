"use client"
import React, { Ref, useMemo, useEffect, useState, useRef } from "react"
import _ from "lodash"

import {
    DragDropAccecptType,
    DragDropJson,
    LayoutProps,
    WidgetProps
} from "../../utils/type/componentFormat"
import { SubColumn } from "../common/index"
import { useMultiColumnsContext } from ".."
import { useDisplayPanelContext } from "../../elementor/drag-drop/DisplayPanelContext"

type TwoColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
    }

export const TwoColumn: React.FC<TwoColumnProps> = (props: TwoColumnProps) => {
    const {
        id,
        isPreview,
        children,
        elements,
        dropRef,
        dropRefMap = new Map([])
    } = props

    const { isMobileView } = useDisplayPanelContext()

    const subColumnAcceptType = useMemo(() => {
        return children?.map((child: any) => child?.childType)
    }, [children])

    const { firstElement, secondElement } = useMemo(() => {
        if (!elements || elements.length == 0)
            return {
                firstElement: null,
                secondElement: null
            }

        return {
            firstElement: elements[0],
            secondElement: elements[1]
        }
    }, [elements])

    const { firstValues, secondValues } = useMemo(() => {
        if (!children || children.length == 0)
            return {
                firstValues: null,
                secondValues: null
            }

        return {
            firstValues: children[0],
            secondValues: children[1]
        }
    }, [children])

    return (
        <div>
            <div
                ref={dropRef ?? null}
                className={`s-two-column-grid`}
                style={{ minHeight: !isPreview ? "150px" : "auto" }}>
                {firstElement && (
                    <div className={`p-1 col-${isMobileView ? 12 : 6}`}>
                        <SubColumn
                            {..._.merge(firstElement, firstValues)}
                            parentId={id}
                            isPreview={isPreview}
                            subColumnAcceptType={subColumnAcceptType}
                        />
                    </div>
                )}
                {secondElement && (
                    <div className={`p-1 col-${isMobileView ? 12 : 6}`}>
                        <SubColumn
                            {..._.merge(secondElement, secondValues)}
                            parentId={id}
                            isPreview={isPreview}
                            subColumnAcceptType={subColumnAcceptType}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
