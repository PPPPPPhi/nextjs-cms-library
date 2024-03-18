"use client"
import React, { Ref, useMemo, useState, useEffect } from "react"
import _ from "lodash"

import { LayoutProps, WidgetProps } from "../../utils/type/componentFormat"
import { SubColumn } from "../common/index"
import { LeftGridsRightColumnJson } from "../index"
import { useDisplayPanelContext } from "../../elementor/drag-drop/DisplayPanelContext"

type LeftGridsRightColumnProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
    }

export const LeftGridsRightColumn: React.FC<LeftGridsRightColumnProps> = (
    props: LeftGridsRightColumnProps
) => {
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
        return LeftGridsRightColumnJson?.propertyJson?.children?.map(
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
                className={`d-flex flex-wrap`}
                style={{ minHeight: !isPreview ? "150px" : "auto" }}>
                <div
                    className={`d-flex flex-column col-${isMobileView ? 12 : 6}`}>
                    {firstElement && (
                        <div className="p-1" style={{ flex: 1 }}>
                            <SubColumn
                                {..._.merge(firstElement, firstValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}
                    {secondElement && (
                        <div className="p-1" style={{ flex: 1 }}>
                            <SubColumn
                                {..._.merge(secondElement, secondValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}
                </div>
                <div className={`col-${isMobileView ? 12 : 6}`}>
                    {thirdElement && (
                        <div className="p-1 h-100">
                            <SubColumn
                                {..._.merge(thirdElement, thirdValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
