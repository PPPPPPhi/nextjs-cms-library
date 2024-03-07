"use client"
import React, { useEffect, useRef } from "react"
const { useDragDropManager } = require("react-dnd")
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import {
    useDuplicateComponent,
    useDeleteComponent,
    useDropComponentInLayout,
    useNavigatePreviousNextStep,
    useScrollDragArea,
    useSwapLayoutChild
} from "../../../utils/index"
import { DisplayMobileGrid } from "../control-bar/DisplayMobileGrid"
import { DragDropAreaContent } from "./DragDropAreaContent"

type DragDropAreaProps = {}

export const DragDropArea: React.FC<DragDropAreaProps> = (
    props: DragDropAreaProps
) => {
    const { isMobileView, setReOrderDropInfo } = useDisplayPanelContext()

    useDuplicateComponent()
    useDeleteComponent()
    useDropComponentInLayout()
    useNavigatePreviousNextStep()
    useSwapLayoutChild()

    const scrollRef = useRef<any>()
    const { updatePosition } = useScrollDragArea(scrollRef)

    const dragDropManager = useDragDropManager()
    const monitor = dragDropManager.getMonitor()

    useEffect(() => {
        const unsubscribe = monitor.subscribeToOffsetChange(() => {
            const offset = monitor.getSourceClientOffset()?.y as number

            updatePosition({
                position: offset,
                isScrollAllowed: true
            })
        })
        return unsubscribe
    }, [monitor, updatePosition])

    return (
        <div
            id="page-drag-drop-area"
            ref={scrollRef}
            className="flex-1"
            style={{
                height: "100%",
                marginLeft: 350,
                marginRight: 350
            }}>
            {isMobileView && (
                <DisplayMobileGrid>
                    <DragDropAreaContent />
                </DisplayMobileGrid>
            )}

            {!isMobileView && <DragDropAreaContent />}
        </div>
    )
}

DragDropArea.displayName = "DragDropArea"
