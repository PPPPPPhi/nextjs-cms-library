"use client"
import React, { Ref, useMemo, useState, useEffect } from "react"
import _ from "lodash"

import {
    DragDropAccecptType,
    LayoutProps,
    WidgetProps
} from "../../utils/type/componentFormat"
import { EmptyLayoutGrid } from "../index"
import { SubColumn } from "../common/index"
import { ThreeColumnJson } from "../index"

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

    const subColumnAcceptType = useMemo(() => {
        return ThreeColumnJson?.propertyJson?.children?.map(
            (child: any) => child?.childType
        )
    }, [])

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

    return (
        <div>
            <div
                ref={dropRef ?? null}
                className={`s-three-column-grid`}
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

                {thirdElement && (
                    <SubColumn
                        {..._.merge(thirdElement, thirdValues)}
                        parentId={id}
                        subColumnAcceptType={subColumnAcceptType}
                    />
                )}
            </div>
        </div>
    )
}
