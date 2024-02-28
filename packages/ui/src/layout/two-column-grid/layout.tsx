"use client"
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
    const [resetColor, setResetColor] = useState<string>("")

    const firstColumnElem = document.getElementById(
        `${id}-${TwoColumnChildType.firstColumn}`
    )
    const secondColumnElem = document.getElementById(
        `${id}-${TwoColumnChildType.secondColumn}`
    )

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

    useEffect(() => {
        // console.log(`[layout] resetColor`, id, resetColor)
        if (!resetColor) return

        if (!firstColumnElem || !secondColumnElem) return

        firstColumnElem.style.background = ""
        secondColumnElem.style.background = ""
    }, [resetColor])

    return (
        <div>
            <div
                ref={dropRef ?? null}
                className={`s-two-column-grid`}
                style={{ minHeight: !isPreview ? "150px" : "auto" }}>
                <div
                    id={`${id}-${TwoColumnChildType.firstColumn}`}
                    className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
                    onMouseEnter={() => setResetColor("")}
                    onMouseOver={() => setResetColor("")}
                    onMouseOut={() =>
                        setResetColor(TwoColumnChildType.firstColumn)
                    }
                    onDragLeave={() =>
                        setResetColor(TwoColumnChildType.firstColumn)
                    }
                    ref={
                        dropRefMap?.get(TwoColumnChildType.firstColumn) ?? null
                    }>
                    {!firstElement?.element && !isPreview && (
                        <EmptyLayoutGrid />
                    )}
                    {firstElement?.element &&
                        firstElement?.component &&
                        firstElement?.component({ ...firstValues })}
                </div>
                <div
                    id={`${id}-${TwoColumnChildType.secondColumn}`}
                    className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
                    onMouseEnter={() => setResetColor("")}
                    onMouseOver={() => setResetColor("")}
                    onMouseOut={() =>
                        setResetColor(TwoColumnChildType.secondColumn)
                    }
                    onDragLeave={() =>
                        setResetColor(TwoColumnChildType.secondColumn)
                    }
                    // style={{
                    //     border: "none",
                    //     borderRadius: "15px",
                    //     backgroundColor: "#e2f5e1",
                    //     margin: "0px 5px 0px 5px"
                    // }}
                    ref={
                        dropRefMap?.get(TwoColumnChildType.secondColumn) ?? null
                    }>
                    {!secondElement?.element && !isPreview && (
                        <EmptyLayoutGrid />
                    )}
                    {secondElement?.element &&
                        secondElement?.component &&
                        secondElement?.component({ ...secondValues })}
                </div>
            </div>
        </div>
    )
}
