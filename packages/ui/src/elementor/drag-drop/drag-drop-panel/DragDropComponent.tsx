import React, { useCallback, useRef, useMemo, useState } from "react"
const { useDrag } = require("react-dnd")

import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import {
    LayoutNameMap,
    MultiColumnsContextProvider
} from "@nextjs-cms-library/ui/index"
import {
    DragDropButton,
    DragDropComponentProps,
    PropertyEditType
} from "../../../utils/index"
import { DuplicateSvg, DeleteSvg } from "./index"
import { DragDropLayoutContainer } from "./DragDropLayoutContainer"

type DragDropComponentButtonsProps = {
    handleEvent: () => void
    buttonType: string
}

export const DragDropComponentButtons: React.FC<
    DragDropComponentButtonsProps
> = ({ buttonType, handleEvent }) => {
    return (
        <div
            onClick={handleEvent}
            style={{ height: 30, width: 30, borderRadius: 25, zIndex: 25 }}
            className={`flex flex-row justify-center cursor-pointer text-white shadow 
                font-medium rounded-full text-sm p-2.5 text-center inline-flex 
                items-center me-2 s-adminGradientBg`}>
            {buttonType == DragDropButton.duplicate && <DuplicateSvg />}
            {buttonType == DragDropButton.delete && <DeleteSvg />}
            {buttonType == DragDropButton.add && <span>Move To Here</span>}
        </div>
    )
}

export const HoverBorder = () => {
    return (
        <hr
            className="w-100"
            style={{
                border: "none",
                borderTop: `5px dotted var(--static-bg-secondary)`,
                height: 5
            }}
        />
    )
}

export const DragDropComponent: React.FC<DragDropComponentProps> = (
    props: DragDropComponentProps
) => {
    const {
        id,
        element,
        elements,
        component,
        hoverIndex,
        offsetIdx,
        elementIdx
    } = props

    const ref = useRef<any>()
    const {
        dragDropList,
        setIsDragging,
        setFocusEditId,
        propertiesEditList,
        setDeleteElementId,
        setDuplicateElementId,
        focusEditId,
        setDropComponentInLayout,
        setSwapLayoutChild,
        toggle,
        dragDropEditList,
        currentHistoryIndex,
        setIsReOrder,
        setIsInsertNested,
        isPreview,
        readOnly,
        isOnHoverLayout
    } = useDisplayPanelContext()

    const isLayout = useMemo(() => {
        // @ts-ignore
        return Object.values(LayoutNameMap).includes(element)
    }, [element])

    const allowDisplay = useMemo(() => {
        return focusEditId?.id == id ? "flex" : "none"
    }, [focusEditId])

    const [{}, drag] = useDrag(() => ({
        item: { id },
        type: id,
        collect: (monitor: any) => ({})
    }))

    console.log("parennnnnt", props)
    const selfData = useMemo(() => {
        const data = propertiesEditList.find(
            (element: PropertyEditType) => element?.id == id
        )
        return data
    }, [propertiesEditList])

    const updateFocusEditComponent = useCallback(() => {
        if (readOnly) return
        if (focusEditId?.id == id) return
        if (focusEditId?.parentId) {
            setFocusEditId({ id })
            return
        }

        setFocusEditId({ id })
    }, [focusEditId])

    const focusElement = useMemo(() => {
        console.log("element id ... ", focusEditId)

        return focusEditId?.id == id
    }, [focusEditId])

    const duplicateComponent = () => {
        setDuplicateElementId(id)
    }

    const deleteComponent = () => {
        setDeleteElementId(id)
    }

    const dragDropContainerSize = useMemo(
        () => dragDropEditList?.length ?? 0,
        [dragDropEditList]
    )
    const isHoverTop = useMemo(() => {
        if (isOnHoverLayout) return false
        return offsetIdx === elementIdx
    }, [offsetIdx, elementIdx, isOnHoverLayout])

    const isHoverBottom = useMemo(() => {
        if (isOnHoverLayout) return false
        return offsetIdx === -1 && dragDropContainerSize - 1 === elementIdx
    }, [offsetIdx, elementIdx, isOnHoverLayout])

    return (
        <div>
            <div id={`edit-${id}`} ref={!readOnly ? ref : null}>
                {isHoverTop && <HoverBorder />}
                <div
                    style={{
                        display: !readOnly ? allowDisplay : "none",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        position: "relative",
                        top: "15px"
                    }}>
                    <DragDropComponentButtons
                        buttonType={DragDropButton.duplicate}
                        handleEvent={duplicateComponent}
                    />
                    <DragDropComponentButtons
                        buttonType={DragDropButton.delete}
                        handleEvent={deleteComponent}
                    />
                </div>

                <div
                    id={`${id}-edit`}
                    ref={drag}
                    onClick={() => updateFocusEditComponent()}
                    className={`s-drag-drop-card`}
                    style={{
                        padding: element === "banner" ? 0 : 20,
                        borderColor: focusElement
                            ? "navy"
                            : isLayout
                              ? "#ABCFFF"
                              : "transparent"
                    }}>
                    {!isLayout && component && (
                        <div>
                            {component({
                                ...selfData,
                                elements: elements
                            })}
                        </div>
                    )}
                    {isLayout && (
                        <DragDropLayoutContainer
                            {...props}
                            selfData={selfData}
                        />
                    )}
                </div>
                {isHoverBottom && <HoverBorder />}
            </div>
        </div>
    )
}

DragDropComponent.displayName = "DragDropComponent"
