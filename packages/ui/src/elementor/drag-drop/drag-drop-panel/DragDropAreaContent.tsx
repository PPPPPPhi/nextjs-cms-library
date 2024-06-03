"use client"
import React, { useEffect, useRef, useState } from "react"
const { useDrop } = require("react-dnd")
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { DragDropEditType, PropertyEditType } from "../../../utils/index"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { EmptyLayoutGrid } from "@nextjs-cms-library/ui/index"
import {
    DragDropJson,
    PropertyJson,
    DragDropAccecptType
} from "@nextjs-cms-library/ui/index"
import { DragDropComponent } from "./DragDropComponent"

import { AddSvg } from "./DragDropButtons"

import useDragDropOffsetHook from "../hooks/useDragDropOffsetHook"
import useDragDropEditHook from "../hooks/useDragDropEditHook"
import useDeleteComponentHook from "../hooks/useDeleteComponentHook"
import useDuplicateComponentHook from "../hooks/useDuplicateComponentHook"
import useViewHook from "../hooks/useViewHook"

type DragDropAreaContentProps = {}

export const DragDropAreaContent: React.FC<DragDropAreaContentProps> = () => {
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
        setFocusEditId,
        isPreview
    } = useDisplayPanelContext()

    useDeleteComponentHook()
    useDuplicateComponentHook()
    // useDropComponentInLayout()
    // useNavigatePreviousNextStep()

    const dragDropEditRef = useRef<any>()
    const propertiesEditRef = useRef<any>()

    useDragDropEditHook()
    const { offsetRefList, containerY } = useDragDropOffsetHook()
    const [offsetPosition, setOffsetPosition] = useState(-99)

    useEffect(() => {
        dragDropEditRef.current = dragDropEditList
        console.log("dragDropEditList??", dragDropEditList)
    }, [dragDropEditList])

    useEffect(() => {
        propertiesEditRef.current = propertiesEditList
    }, [propertiesEditList])

    const createDropItem = (itemType: string, idx: number) => {
        if (!dragDropList || !propertiesList) return
        const elementId = uuid_v4()

        console.log("itemTypeitemType", itemType)
        console.log("itemTypeitemType dragDropList", dragDropList)

        const newEditComponent: DragDropEditType = {
            ...((dragDropList?.get(itemType) as DragDropJson) ??
                (layoutDragDropList?.get(itemType) as DragDropJson)),
            id: elementId
        }
        const newPropertiesComponent: PropertyEditType = {
            ...((propertiesList?.get(itemType) as PropertyJson) ??
                (layoutPropertiesList?.get(itemType) as PropertyJson)),
            id: elementId
        }

        const position = idx === -1 ? dragDropEditRef.current?.length ?? 0 : idx

        const newDragDropList = _.cloneDeep(dragDropEditRef.current)
        newDragDropList.splice(position, 0, newEditComponent)
        const newPropertyList = _.cloneDeep(propertiesEditRef.current)
        newPropertyList.splice(position, 0, newPropertiesComponent)

        console.log("uppppp 4", newDragDropList)
        console.log("puuuuu 1")

        setDragDropEditList(_.cloneDeep(newDragDropList))
        setPropertiesEditList(_.cloneDeep(newPropertyList))
        setFocusEditId({ id: elementId })
    }

    const updateDropItem = (itemId: string, idx: number, parentId: number) => {
        if (dragDropEditRef.current.length <= 1 && !parentId) return
        const currentIdx = dragDropEditRef?.current?.findIndex(
            (l: any) => l.id === (parentId ?? itemId)
        )
        const currentItem = dragDropEditRef?.current?.find(
            (l: any) => l.id === (parentId ?? itemId)
        )
        const currentPropItem = propertiesEditRef?.current?.find(
            (l: any) => l.id === (parentId ?? itemId)
        )

        let position = 0

        const newDragDropList = _.cloneDeep(dragDropEditRef.current)
        const newPropertyList = _.cloneDeep(propertiesEditRef.current)

        if (parentId) {
            position = idx === -1 ? dragDropEditRef.current?.length ?? 0 : idx

            const currentChildIndex = newDragDropList[
                currentIdx
            ].elements.findIndex((l: any) => l.id === itemId)
            const currentChild = newDragDropList[currentIdx].elements.find(
                (l: any) => l.id === itemId
            )
            const currentChildProps = newPropertyList[currentIdx].children.find(
                (l: any) => l.id === itemId
            )

            newDragDropList[currentIdx].elements[currentChildIndex] = {
                element: "",
                type: "",
                childType: currentChild.childType,
                label: "",
                placeholder: "",
                value: "",
                component: EmptyLayoutGrid
            }

            newPropertyList[currentIdx].children[currentChildIndex] = {
                element: "",
                label: "",
                placeholder: "",
                value: "",
                type: "",
                childType: currentChild.childType
            }

            newDragDropList.splice(position, 0, { ...currentChild })
            newPropertyList.splice(position, 0, { ...currentChildProps })
            setFocusEditId({ id: currentChild?.id })
        } else {
            // @ts-ignore
            position =
                idx === -1 ? dragDropEditRef.current?.length - 1 ?? 0 : idx
            position =
                position > currentIdx && idx !== -1 ? position - 1 : position

            newDragDropList.splice(currentIdx, 1)
            newPropertyList.splice(currentIdx, 1)

            newDragDropList.splice(position, 0, currentItem)
            newPropertyList.splice(position, 0, currentPropItem)
            setFocusEditId({ id: currentItem?.id })
        }

        console.log("uppppp 5", newDragDropList)
        console.log("puuuuu 2")

        setDragDropEditList(_.cloneDeep(newDragDropList))
        setPropertiesEditList(_.cloneDeep(newPropertyList))
    }

    const [{ isDragging }, drop] = useDrop(
        () => ({
            accept: _.concat(DragDropAccecptType, dragDropEditAcceptType),
            hover: (item: any, monitor: any) => {
                const { y: clientOffset } = monitor.getClientOffset()
                const offsetIdx = offsetRefList.findIndex(
                    (l) => l > clientOffset + containerY
                )
                setOffsetPosition(offsetIdx)
            },
            drop: (_item: any, monitor: any) => {
                if (monitor.canDrop()) {
                    const { y: clientOffset } = monitor.getClientOffset()
                    const offsetIdx = offsetRefList.findIndex(
                        (l) => l > clientOffset + containerY
                    )
                    if (!_item.id)
                        createDropItem(
                            monitor.getItemType() as string,
                            offsetIdx
                        )
                    else updateDropItem(_item.id, offsetIdx, _item.parentId)
                }
            },
            collect: (monitor: any) => ({
                isDragging: monitor.isOver()
            })
        }),
        [offsetRefList, dragDropEditAcceptType, containerY]
    )

    useEffect(() => {
        if (!isDragging) setOffsetPosition(-99)
    }, [isDragging])

    return (
        <div
            id="display-panel-drag-drop-area"
            ref={drop}
            style={{
                background: isDragging ? "#F6F6F6" : "white",
                minHeight: "100%"
            }}>
            {dragDropEditRef?.current &&
                (dragDropEditRef?.current ?? []).map(
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
                                    elementIdx={index}
                                    offsetIdx={offsetPosition}
                                    hoverIndex={component?.hoverIndex ?? index}
                                    isLastElement={
                                        dragDropEditRef?.current?.length - 1 ===
                                        index
                                    }
                                />
                            </div>
                        )
                    }
                )}

            <div
                style={{
                    display: isPreview ? "none" : "block",
                    borderBottom: "thin dashed lightgrey"
                }}>
                <div
                    className="d-flex justify-content-center position-relative"
                    style={{
                        top: 10
                    }}>
                    <AddSvg width={20} height={20} />
                </div>
            </div>
        </div>
    )
}

DragDropAreaContent.displayName = "DragDropAreaContent"
