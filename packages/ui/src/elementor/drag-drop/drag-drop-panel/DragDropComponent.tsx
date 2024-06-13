import React, { useCallback, useRef, useMemo, useState, useEffect } from "react"
const { useDrag } = require("react-dnd")

import _, { every } from "lodash"

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
import {
    AdminActionButton,
    AdminTableActionWarnButton
} from "@nextjs-cms-library/admin-components/index"

type DragDropComponentButtonsProps = {
    handleEvent: () => void
    buttonType: string
    style: React.CSSProperties
}

export const DragDropComponentButtons: React.FC<
    DragDropComponentButtonsProps
> = ({ buttonType, handleEvent, style }) => {
    return (
        <>
            {buttonType == DragDropButton.delete && (
                <AdminTableActionWarnButton
                    label="Delete"
                    action={handleEvent}
                    style={{
                        position: "absolute",
                        right: 100,
                        top: "-30px",
                        zIndex: 1,
                        ...style
                    }}
                />
            )}
            {buttonType == DragDropButton.duplicate && (
                <AdminActionButton
                    label="Clone"
                    onClick={handleEvent}
                    style={{
                        minWidth: 75,
                        position: "absolute",
                        right: 20,
                        top: "-30px",
                        zIndex: 1,
                        ...style
                    }}
                />
            )}
            {buttonType == DragDropButton.add && <span>Move To Here</span>}
        </>
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
        elementIdx,
        isLastElement
    } = props

    const ref = useRef<any>()
    const {
        setFocusEditId,
        propertiesEditList,
        setDeleteElementId,
        setDuplicateElementId,
        focusEditId,
        dragDropEditList,
        isPreview,
        readOnly,
        isOnHoverLayout,
        isLayoutReady,
        setIsLayoutReady
    } = useDisplayPanelContext()

    useEffect(() => {
        if (!isLayoutReady && isLastElement) setIsLayoutReady(true)
    }, [])

    const isLayout = useMemo(() => {
        // @ts-ignore
        return Object.values(LayoutNameMap).includes(element)
    }, [element])

    const allowDisplay = useMemo(() => {
        return focusEditId?.id == id ? "flex" : "none"
    }, [focusEditId])

    const [{}, drag] = useDrag(
        () => ({
            item: { id },
            type: isPreview || readOnly ? "Not-draggable" : id,
            collect: (monitor: any) => ({})
        }),
        [isPreview, readOnly]
    )

    const selfData = useMemo(() => {
        const data = propertiesEditList.find(
            (element: PropertyEditType) => element?.id == id
        )
        return data
    }, [propertiesEditList])

    const updateFocusEditComponent = useCallback(() => {
        if (readOnly || isPreview) return
        if (focusEditId?.id == id) return
        if (focusEditId?.parentId) {

            setFocusEditId({ id })
            return
        }

        setFocusEditId({ id })
    }, [focusEditId])

    const focusElement = useMemo(() => {
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
                        height: 30,
                        display: isPreview ? "none" : "block"
                    }}
                />
                <div
                    style={{
                        display: !readOnly ? allowDisplay : "none",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        position: "relative",
                        top: "15px",
                        right: 15
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
                    onClick={(evt) => {
                        evt.preventDefault()
                        updateFocusEditComponent()
                    }}
                    className={isPreview || readOnly ? "" : `s-drag-drop-card`}
                    style={{
                        borderRadius: 0,
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
                                elements: elements,
                                isPreview
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
