import React, { useEffect, useRef, useMemo } from "react"
const { useDrop, useDragDropManager } = require("react-dnd")
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { DragDropEditType, PropertyEditType } from "../../../utils/index"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import {
    DragDropJson,
    PropertyJson,
    DragDropAccecptType,
    EmptyLayoutGrid
} from "@nextjs-cms-library/ui/index"
import { DragDropComponent } from "./DragDropComponent"

import {
    useDuplicateComponent,
    useDeleteComponent,
    useDropComponentInLayout,
    useNavigatePreviousNextStep,
    useScrollDragArea,
    useSwapLayoutChild
} from "../../../utils/index"
import { AddSvg } from "./DragDropButtons"

type DragDropAreaContentProps = {}

export const DragDropAreaContent: React.FC<DragDropAreaContentProps> = (
    props: DragDropAreaContentProps
) => {
    const {
        dragDropEditAcceptType,
        dragDropList,
        layoutDragDropList,
        dragDropEditList,
        setDragDropEditList,
        propertiesList,
        layoutPropertiesList,
        propertiesEditList,
        setPropertiesEditList,
        dragDropHistoryList,
        setDragDropHistoryList,
        propertiesHistoryList,
        setPropertiesHistoryList,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        historyCapSize,
        toggle,
        isExpandView,
        isMobileView,
        reOrderDropInfo,
        isPreview,
        setReOrderDropInfo
    } = useDisplayPanelContext()

    useDuplicateComponent()
    useDeleteComponent()
    useDropComponentInLayout()
    useNavigatePreviousNextStep()

    const dragDropEditRef = useRef<any>()
    const propertiesEditRef = useRef<any>()
    const dragDropHistoryRef = useRef<any>()
    const propertiesHistoryRef = useRef<any>()

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

    const [{ canDrop }, drop] = useDrop(
        () => ({
            accept: _.concat(DragDropAccecptType, dragDropEditAcceptType),
            hover: (item: any, monitor: any) => {},
            drop: (_item: any, monitor: any) => {
                console.log("dddddddrop", monitor.didDrop())

                if (!monitor.didDrop()) {
                    const item = monitor.getItemType() as string

                    console.log("dddddddrop item", item)

                    if (!item) return

                    if (!item.includes("-edit")) {
                        updateDraggedComponent(item)
                    }

                    return undefined
                }
            },
            collect: (monitor: any) => ({
                canDrop: monitor.canDrop()
            })
        }),
        [dragDropList, dragDropEditAcceptType, currentHistoryIndex]
    )

    useEffect(() => {
        dragDropEditRef.current = dragDropEditList
    }, [dragDropEditList])

    useEffect(() => {
        propertiesEditRef.current = propertiesEditList
    }, [propertiesEditList])

    useEffect(() => {
        dragDropHistoryRef.current = dragDropHistoryList
    }, [dragDropHistoryList])

    useEffect(() => {
        propertiesHistoryRef.current = propertiesHistoryList
    }, [propertiesHistoryList])

    const updateDraggedComponent = (elementName: string) => {
        if (!dragDropList || !propertiesList) return

        const newId = uuid_v4()

        const newEditComponent: DragDropEditType = {
            ...((dragDropList?.get(elementName) as DragDropJson) ??
                (layoutDragDropList?.get(elementName) as DragDropJson)),
            id: newId
        }
        const newPropertiesComponent: PropertyEditType = {
            ...((propertiesList?.get(elementName) as PropertyJson) ??
                (layoutPropertiesList?.get(elementName) as PropertyJson)),
            id: newId
        }

        const newDnd = [
            ...(dragDropHistoryList[currentHistoryIndex] ?? []),
            newEditComponent
        ]

        const newProp = [
            ...(propertiesHistoryList[currentHistoryIndex] ?? []),
            newPropertiesComponent
        ]

        console.log(`new drag `, newDnd, newProp)

        setDragDropEditList([...dragDropEditRef.current, newEditComponent])

        setPropertiesEditList([
            ...propertiesEditRef.current,
            newPropertiesComponent
        ])

        const snapShotDragDrop = _.cloneDeep(newDnd)
        const snapShotProperty = _.cloneDeep(newProp)

        setDragDropHistoryList([
            ...dragDropHistoryRef.current.slice(0, currentHistoryIndex + 1),
            snapShotDragDrop
        ])

        setPropertiesHistoryList([
            ...propertiesHistoryRef.current.slice(0, currentHistoryIndex + 1),
            snapShotProperty
        ])

        if (currentHistoryIndex < historyCapSize - 1)
            setCurrentHistoryIndex(currentHistoryIndex + 1)

        console.log(`updated dragged list`, newPropertiesComponent)
        return
    }

    const currentDragDropEdit = useMemo(() => {
        const list = dragDropEditList

        return list
    }, [currentHistoryIndex, dragDropHistoryRef, toggle, dragDropEditList])

    console.log("currentDragDropEditcurrentDragDropEdit", currentDragDropEdit)

    return (
        <div
            id="display-panel-drag-drop-area"
            ref={drop}
            style={{
                //height: !isMobileView ? "95%" : "100%"
                height: "100%"
            }}>
            {/* {(!currentDragDropEdit || currentDragDropEdit.length == 0) && (
                <EmptyLayoutGrid />
            )} */}
            {currentDragDropEdit &&
                currentDragDropEdit.map(
                    (
                        component: DragDropEditType & {
                            hoverIndex: number
                        },
                        index: number
                    ) => {
                        return (
                            <div key={component?.id}>
                                <DragDropComponent
                                    {...component}
                                    hoverIndex={component?.hoverIndex ?? index}
                                />
                            </div>
                        )
                    }
                )}

            {!isPreview && (
                <div style={{padding: "60px 0px"}}>
                    <div
                        style={{
                            borderBottom: "solid thin lightgrey"
                        }}>
                        <div
                            style={{
                                position: "relative",
                                top: "10px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}>
                            <AddSvg width={20} height={20} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

DragDropAreaContent.displayName = "DragDropAreaContent"
