import React, { Ref, useMemo, useState, useEffect } from "react"

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

type ThreeColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
    }

export const ThreeColumn: React.FC<ThreeColumnProps> = (
    props: ThreeColumnProps
) => {
    const {
        id,
        children,
        elements,
        dropRef,
        dropRefMap = new Map([]),
        isPreview = false
    } = props

    const [resetColor, setResetColor] = useState<boolean>()

    const firstColumnElem = document.getElementById(
        `${id}-${ThreeColumnChildType.firstColumn}`
    )
    const secondColumnElem = document.getElementById(
        `${id}-${ThreeColumnChildType.secondColumn}`
    )

    const thirdColumnElem = document.getElementById(
        `${id}-${ThreeColumnChildType.thirdColumn}`
    )

    const { firstElement, secondElement, thirdElement } = useMemo(() => {
        if (!elements || elements.length == 0)
            return {
                firstElement: null,
                secondElement: null,
                thirdElement: null
            }

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

        return {
            firstValues: children[0],
            secondValues: children[1],
            thirdValues: children[2]
        }
    }, [children])

    useEffect(() => {
        // console.log(`[layout] resetColor`, id, resetColor)
        if (!resetColor) return

        if (!firstColumnElem || !secondColumnElem || !thirdColumnElem) return

        firstColumnElem.style.background = ""
        secondColumnElem.style.background = ""
        thirdColumnElem.style.background = ""
    }, [resetColor])

    return (
        <div>
            <div ref={dropRef ?? null} className={`s-three-column-grid`}>
                <div
                    id={`${id}-${ThreeColumnChildType.firstColumn}`}
                    className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
                    onMouseEnter={() => setResetColor(false)}
                    onMouseOver={() => setResetColor(false)}
                    onMouseOut={() => setResetColor(true)}
                    onDragLeave={() => setResetColor(true)}
                    ref={
                        dropRefMap?.get(ThreeColumnChildType.firstColumn) ??
                        null
                    }>
                    {!firstElement?.element && !isPreview && (
                        <EmptyLayoutGrid />
                    )}
                    {firstElement?.element &&
                        firstElement?.component &&
                        firstElement?.component({ ...firstValues })}
                </div>
                <div
                    id={`${id}-${ThreeColumnChildType.secondColumn}`}
                    className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
                    onMouseEnter={() => setResetColor(false)}
                    onMouseOver={() => setResetColor(false)}
                    onMouseOut={() => setResetColor(true)}
                    onDragLeave={() => setResetColor(true)}
                    ref={
                        dropRefMap?.get(ThreeColumnChildType.secondColumn) ??
                        null
                    }>
                    {!secondElement?.element && !isPreview && (
                        <EmptyLayoutGrid />
                    )}
                    {secondElement?.element &&
                        secondElement?.component &&
                        secondElement?.component({ ...secondValues })}
                </div>

                <div
                    id={`${id}-${ThreeColumnChildType.thirdColumn}`}
                    className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
                    onMouseEnter={() => setResetColor(false)}
                    onMouseOver={() => setResetColor(false)}
                    onMouseOut={() => setResetColor(true)}
                    onDragLeave={() => setResetColor(true)}
                    ref={
                        dropRefMap?.get(ThreeColumnChildType.thirdColumn) ??
                        null
                    }>
                    {!thirdElement?.element && !isPreview && (
                        <EmptyLayoutGrid />
                    )}
                    {thirdElement?.element &&
                        thirdElement?.component &&
                        thirdElement?.component({ ...thirdValues })}
                </div>
            </div>
        </div>
    )
}
