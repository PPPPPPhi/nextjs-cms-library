"use client"
import React, { Ref, useMemo, useState, useEffect } from "react"
import _ from "lodash"
import "./style.scss"
import {
    DragDropAccecptType,
    LayoutProps,
    WidgetProps
} from "../../utils/type/componentFormat"
import { EmptyLayoutGrid, useMultiColumnsContext } from "../index"
import { SubColumn } from "../common/index"
import { BentoGridJson } from "../index"
import { useDisplayPanelContext } from "../../elementor/drag-drop/DisplayPanelContext"

const BentoGridChildType = {
    firstColumn: "bento-grid-first",
    secondColumn: "bento-grid-second",
    thirdColumn: "bento-grid-third",
    fourthColumn: "bento-grid-fourthColumn",
    fifthColumn: "bento-grid-fifthColumn",
    sixthColumn: "bento-grid-sixthColumn",
    seventhColumn: "bento-grid-seventhColumn",
    eightColumn: "bento-grid-eightColumn"
}

type BentoGridProps = WidgetProps &
    LayoutProps & {
        id?: string
        isPreview?: boolean
        selfData: any
    }

export const BentoGrid: React.FC<BentoGridProps> = (
    props: BentoGridProps
) => {
    const {
        id,
        isPreview,
        children,
        elements,
        dropRef,
        dropRefMap = new Map([])
    } = props

    const backgroundColor = props.selfData?.properties?.find((l: any) => l.label === "Background Color")?.value ?? "brown"

    const subColumnAcceptType = useMemo(() => {
        return BentoGridJson?.propertyJson?.children?.map(
            (child: any) => child?.childType
        )
    }, [])

    const { isMobileView } = useDisplayPanelContext()

    const { firstElement, secondElement, thirdElement, fourthElement, fifthElement, sixthElement, seventhElement, eightElement } = useMemo(() => {
        if (!elements || elements.length == 0)
            return {
                firstElement: null,
                secondElement: null,
                thirdElement: null,
                fourthElement: null,
                fifthElement: null,
                sixthElement: null,
                seventhElement: null,
                eightElement: null
            }

        return {
            firstElement: elements[0],
            secondElement: elements[1],
            thirdElement: elements[2],
            fourthElement: elements[3],
            fifthElement: elements[4],
            sixthElement: elements[5],
            seventhElement: elements[6],
            eightElement: elements[7]
        }
    }, [elements])

    const { firstValues, secondValues, thirdValues, fourthValues, fifthValues, sixthValues, seventhValues, eightValues } = useMemo(() => {
        if (!children || children.length == 0)
            return {
                firstValues: null,
                secondValues: null,
                thirdValues: null,
                fourthValues: null,
                fifthValues: null,
                sixthValues: null,
                seventhValues: null,
                eightValues: null
            }

        return {
            firstValues: children[0],
            secondValues: children[1],
            thirdValues: children[2],
            fourthValues: children[3],
            fifthValues: children[4],
            sixthValues: children[5],
            seventhValues: children[6],
            eightValues: children[7]
        }
    }, [children])

    const { focusEditId, setFocusEditId } = useMultiColumnsContext()
    const updateFocusEditComponent = ()=>{
        setFocusEditId({...focusEditId, id, childType: "parent"})
    }

    return (
        <div style={{ backgroundColor: backgroundColor} } className="bento-grid-style"
        onClick={() => updateFocusEditComponent()}>
            <div className={`p-1 col-12`}>
                <div ref={dropRef ?? null} className={ `${isMobileView ? "mobile" : "desktop"}`} 
                    style={{ minHeight: !isPreview ? "150px" : "auto" }}>
                    {firstElement && (
                        <div className={`single-row-1`} >
                            <SubColumn
                                {..._.merge(firstElement, firstValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}
                    {secondElement && (
                        <div className={`single-row-2`}>
                            <SubColumn
                                {..._.merge(secondElement, secondValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}

                    {thirdElement && (
                        <div className={`single-row-spancol`}>
                            <SubColumn
                                {..._.merge(thirdElement, thirdValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}
                    {fourthElement && (
                        <div className={`span-row`}>
                            <SubColumn
                                {..._.merge(fourthElement, fourthValues)}
                                parentId={id}
                                isPreview={isPreview}
                                subColumnAcceptType={subColumnAcceptType}
                            />
                        </div>
                    )}

                    {fifthElement && (
                            <div className={`single-row-spancol-2`}>
                                <SubColumn
                                    {..._.merge(fifthElement, fifthValues)}
                                    parentId={id}
                                    isPreview={isPreview}
                                    subColumnAcceptType={subColumnAcceptType}
                                />
                            </div>
                        )}
                        {sixthElement && (
                            <div className={`single-row`}>
                                <SubColumn
                                    {..._.merge(sixthElement, sixthValues)}
                                    parentId={id}
                                    isPreview={isPreview}
                                    subColumnAcceptType={subColumnAcceptType}
                                />
                            </div>
                        )}
                        {seventhElement && (
                            <div className={`single-row-spancol-3`}>
                                <SubColumn
                                    {..._.merge(seventhElement, seventhValues)}
                                    parentId={id}
                                    isPreview={isPreview}
                                    subColumnAcceptType={subColumnAcceptType}
                                />
                            </div>
                        )}
                        {eightElement && (
                            <div className={`single-row`}>
                                <SubColumn
                                    {..._.merge(eightElement, eightValues)}
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
