import React, { Ref, useMemo } from "react"

import {
    DragDropAccecptType,
    LayoutProps,
    WidgetProps
} from "../../utils/type/componentFormat"
import { EmptyLayoutGrid } from "../EmptyLayoutGrid"

type ThreeColumnProps = WidgetProps & LayoutProps & {}

export const ThreeColumn: React.FC<ThreeColumnProps> = (
    props: ThreeColumnProps
) => {
    const { children, elements, dropRef } = props

    const defaultElement: React.FC<any> = () => {
        return <EmptyLayoutGrid />
    }

    const { firstElement, secondElement, thirdElement } = useMemo(() => {
        if (!elements || elements.length == 0)
            return {
                firstElement: defaultElement,
                secondElement: defaultElement,
                thirdElement: defaultElement
            }
        console.log(`element0`, elements[0])

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
        console.log(`children0`, children[0])

        return {
            firstValues: children[0],
            secondValues: children[1],
            thirdValues: children[2]
        }
    }, [children])

    return (
        <div>
            <div ref={dropRef ?? null} className={`s-three-column-container`}>
                {(!elements || elements.length == 0) && <EmptyLayoutGrid />}

                {elements && elements.length > 0 && (
                    <div className={`s-three-column-grid gap-3 w-100`}>
                        {elements &&
                            elements.map((i: any, index: number) => {
                                return (
                                    <div key={`${i?.id}-children-${index}`}>
                                        {i.component({
                                            ...children?.[index]
                                        })}
                                    </div>
                                )
                            })}
                    </div>
                )}
            </div>
        </div>
    )
}
