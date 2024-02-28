import React, { Ref, useMemo, useEffect, useState, useRef } from "react"
import _ from "lodash"

import {
    DragDropAccecptType,
    DragDropJson,
    LayoutProps,
    WidgetProps
} from "../../utils/type/componentFormat"
import { EmptyLayoutGrid } from "../EmptyLayoutGrid"

const TwoColumnChildType = {
    firstColumn: "two-column-first",
    secondColumn: "two-column-second"
}

type TwoColumnProps = WidgetProps & LayoutProps & {}

export const TwoColumn: React.FC<TwoColumnProps> = (props: TwoColumnProps) => {
    const { children, elements, dropRef, dropRefMap = new Map([]) } = props

    const defaultElement: React.FC<any> = () => {
        return <EmptyLayoutGrid />
    }

    const { firstElement, secondElement } = useMemo(() => {
        if (!elements || elements.length == 0)
            return {
                firstElement: null,
                secondElement: null
            }
        console.log(`element`, elements)

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
        console.log(`children`, children)

        return {
            firstValues: children[0],
            secondValues: children[1]
        }
    }, [children])

    return (
        <div>
            <div ref={dropRef ?? null} className={`s-two-column-grid`}>
                <div
                    ref={
                        dropRefMap?.get(TwoColumnChildType.firstColumn) ?? null
                    }>
                    {!firstElement?.element && <EmptyLayoutGrid />}
                    {firstElement?.element &&
                        firstElement?.component &&
                        firstElement?.component({ ...firstValues })}
                </div>
                <div
                    ref={
                        dropRefMap?.get(TwoColumnChildType.secondColumn) ?? null
                    }>
                    {!secondElement?.element && <EmptyLayoutGrid />}
                    {secondElement?.element &&
                        secondElement?.component &&
                        secondElement?.component({ ...secondValues })}
                </div>
            </div>
        </div>
    )
}
