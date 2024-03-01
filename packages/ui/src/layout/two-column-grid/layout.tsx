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

type TwoColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
    }

export const TwoColumn: React.FC<TwoColumnProps> = (props: TwoColumnProps) => {
    const {
        id,
        children,
        elements,
        dropRef,
        dropRefMap = new Map([]),
        isPreview = false
    } = props

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
                    <SubColumn
                        {..._.merge(firstElement, firstValues)}
                        parentId={id}
                        subColumnAcceptType={subColumnAcceptType}
                    />
                )}
                {secondElement && (
                    <SubColumn
                        {..._.merge(secondElement, secondValues)}
                        parentId={id}
                        subColumnAcceptType={subColumnAcceptType}
                    />
                )}
            </div>
        </div>
    )
}
