import React, { Ref, useMemo } from "react"

import {
    DragDropAccecptType,
    LayoutProps,
    WidgetProps
} from "../../utils/type/componentFormat"
import { EmptyLayoutGrid } from "../EmptyLayoutGrid"

const ThreeColumnChildType = {
    firstColumn: "three-column-first",
    secondColumn: "three-column-second",
    thirdColumn: "three-column-third"
}

type ThreeColumnProps = WidgetProps & LayoutProps & {}

export const ThreeColumn: React.FC<ThreeColumnProps> = (
    props: ThreeColumnProps
) => {
    const { children, elements, dropRef, dropRefMap = new Map([]) } = props

    const defaultElement: React.FC<any> = () => {
        return <EmptyLayoutGrid />
    }

    const { firstElement, secondElement, thirdElement } = useMemo(() => {
        if (!elements || elements.length == 0)
            return {
                firstElement: null,
                secondElement: null,
                thirdElement: null
            }
        console.log(`element0`, elements)

        return {
            firstElement: elements[0],
            secondElement: elements[1],
            thirdElement: elements[2]
        }
    }, [elements])

    const { firstValues, secondValues, thirdValues } = useMemo(() => {
        if (!children || children.length == 0)
            return {
                firstValues: null,
                secondValues: null,
                thirdValues: null
            }
        console.log(`children0`, children)

        return {
            firstValues: children[0],
            secondValues: children[1],
            thirdValues: children[2]
        }
    }, [children])

    return (
        <div>
            <div ref={dropRef ?? null} className={`s-three-column-grid`}>
                <div
                    ref={
                        dropRefMap?.get(ThreeColumnChildType.firstColumn) ??
                        null
                    }>
                    {!firstElement?.element && <EmptyLayoutGrid />}
                    {firstElement?.element &&
                        firstElement?.component &&
                        firstElement?.component({ ...firstValues })}
                </div>
                <div
                    ref={
                        dropRefMap?.get(ThreeColumnChildType.secondColumn) ??
                        null
                    }>
                    {!secondElement?.element && <EmptyLayoutGrid />}
                    {secondElement?.element &&
                        secondElement?.component &&
                        secondElement?.component({ ...secondValues })}
                </div>

                <div
                    ref={
                        dropRefMap?.get(ThreeColumnChildType.thirdColumn) ??
                        null
                    }>
                    {!thirdElement?.element && <EmptyLayoutGrid />}
                    {thirdElement?.element &&
                        thirdElement?.component &&
                        thirdElement?.component({ ...thirdValues })}
                </div>
            </div>
        </div>
    )
}
