import React, { useRef, useState, useEffect, useMemo } from "react"
const { useDrag, useDrop } = require("react-dnd")
import { v4 as uuid_v4 } from "uuid"
import { EmptyLayoutGrid } from "@nextjs-cms-library/ui/index"

import _ from "lodash"

import {
    DragDropAccecptElementType,
    DragDropComponentProps,
    useDisplayPanelContext,
    DragDropJson,
    PropertyJson
} from "@nextjs-cms-library/ui/index"

import { DragDropEditType, PropertyEditType } from "../../utils"
import useViewHook from "../../elementor/drag-drop/hooks/useViewHook"

type withSubColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    parentId: string
}

const withSubColumn =
    (WrappedComponent: React.FC<any>) => (props: withSubColumnProps) => {
        const { id, parentId, element, childType } = props

        const {
            layoutDragDropList,
            layoutPropertiesList,
            dragDropEditList,
            propertiesEditList,
            dragDropList,
            propertiesList,
            setDragDropEditList,
            setPropertiesEditList,
            dragDropEditAcceptElementType,
            setFocusEditId,
            focusEditId,
            readOnly,
            isPreview
        } = useDisplayPanelContext()

        const dragDropEditRef = useRef<any>()
        const propertiesEditRef = useRef<any>()

        const [isHover, setIsHover] = useState(false)

        useEffect(() => {
            dragDropEditRef.current = dragDropEditList
        }, [dragDropEditList])

        useEffect(() => {
            propertiesEditRef.current = propertiesEditList
        }, [propertiesEditList])

        const getNewRefItem = (
            srcList: any[],
            parentIdx: number,
            ref: any,
            dropIdx: number,
            newItem: any,
            childType: string
        ) => {
            let list = _.cloneDeep(srcList)

            const c = list.map((l, idx) => {
                if (parentIdx === idx) {
                    return {
                        ...l,
                        [ref]: l[ref].map((k: any, idx: number) => {
                            if (idx === dropIdx)
                                return {
                                    ...newItem,
                                    childType
                                }
                            else return k
                        })
                    }
                } else return l
            })

            return c
        }

        const updateDropItem = (itemId: string, parentIdRef: number) => {
            const currentIdx = dragDropEditRef?.current?.findIndex(
                (l: any) => l.id === (parentIdRef ?? itemId)
            )
            const currentItem = dragDropEditRef?.current?.find(
                (l: any) => l.id === (parentIdRef ?? itemId)
            )
            const currentPropItem = propertiesEditRef?.current?.find(
                (l: any) => l.id === (parentIdRef ?? itemId)
            )
            const parentIdx = dragDropEditRef?.current?.findIndex(
                (k: any) => k.id === parentId
            )

            const newDragDropList = _.cloneDeep(dragDropEditRef.current)
            const newPropertyList = _.cloneDeep(propertiesEditRef.current)

            const dropChildItem =
                newDragDropList[parentIdx]?.elements?.find(
                    (k: any) => k.childType === childType
                ) ?? 0

            if (dropChildItem.element) return

            const dropChildIndex =
                newDragDropList[parentIdx]?.elements?.findIndex(
                    (k: any) => k.childType === childType
                ) ?? 0

            if (parentIdRef) {
                const currentChildIndex = newDragDropList[
                    currentIdx
                ].elements.findIndex((l: any) => l.id === itemId)

                const currentChild = newDragDropList[currentIdx].elements.find(
                    (l: any) => l.id === itemId
                )
                const currentChildProps = newPropertyList[
                    currentIdx
                ].children.find((l: any) => l.id === itemId)

                const newDragDropDeepList = getNewRefItem(
                    newDragDropList,
                    currentIdx,
                    "elements",
                    currentChildIndex,
                    {
                        element: "",
                        type: "",
                        childType: currentChild.childType,
                        label: "",
                        placeholder: "",
                        value: "",
                        component: EmptyLayoutGrid
                    },
                    currentChild.childType
                )
                const newDragDropDeepListSettled = getNewRefItem(
                    newDragDropDeepList,
                    parentIdx,
                    "elements",
                    dropChildIndex,
                    currentChild,
                    childType as string
                )

                const newPropertyDeepList = getNewRefItem(
                    newPropertyList,
                    currentIdx,
                    "children",
                    currentChildIndex,
                    {
                        element: "",
                        label: "",
                        placeholder: "",
                        value: "",
                        type: "",
                        childType: currentChild.childType
                    },
                    currentChild.childType
                )
                const newPropertyDeepListSettled = getNewRefItem(
                    newPropertyDeepList,
                    parentIdx,
                    "children",
                    dropChildIndex,
                    currentChildProps,
                    childType as string
                )

                console.log("uppppp 8", newDragDropDeepListSettled)
                console.log("puuuuu 8")

                setDragDropEditList(_.cloneDeep(newDragDropDeepListSettled))
                setPropertiesEditList(_.cloneDeep(newPropertyDeepListSettled))
                setFocusEditId({ id: currentChild.id, parentId })
            } else {
                const newDragDropDeepListSettled = getNewRefItem(
                    newDragDropList,
                    parentIdx,
                    "elements",
                    dropChildIndex,
                    currentItem,
                    childType as string
                )

                const newPropertyDeepListSettled = getNewRefItem(
                    newPropertyList,
                    parentIdx,
                    "children",
                    dropChildIndex,
                    currentPropItem,
                    childType as string
                )

                newDragDropDeepListSettled.splice(currentIdx, 1)
                newPropertyDeepListSettled.splice(currentIdx, 1)

                console.log("uppppp 9", newDragDropDeepListSettled)
                console.log("puuuuu 9")

                setDragDropEditList(_.cloneDeep(newDragDropDeepListSettled))
                setPropertiesEditList(_.cloneDeep(newPropertyDeepListSettled))
                setFocusEditId({ id: currentItem.id })
            }
        }

        const createDropItem = (itemType: string) => {
            if (!dragDropList || !propertiesList) return
            const elementId = uuid_v4()

            const parentIdx = dragDropEditList.findIndex(
                (k) => k.id === parentId
            )

            const newEditComponent: DragDropEditType = _.cloneDeep({
                ...((dragDropList?.get(itemType) as DragDropJson) ??
                    (layoutDragDropList?.get(itemType) as DragDropJson)),
                id: elementId
            })
            const newPropertiesComponent: PropertyEditType = _.cloneDeep({
                ...((propertiesList?.get(itemType) as PropertyJson) ??
                    (layoutPropertiesList?.get(itemType) as PropertyJson)),
                id: elementId
            })

            const dropChildIndex =
                dragDropEditList[parentIdx]?.elements?.findIndex(
                    (k) => k.childType === childType
                ) ?? 0

            const newDragDropList = _.cloneDeep(dragDropEditRef.current)
            const newDragDropDeepList = getNewRefItem(
                newDragDropList,
                parentIdx,
                "elements",
                dropChildIndex,
                newEditComponent,
                childType as string
            )

            const newPropertyList = _.cloneDeep(propertiesEditRef.current)
            const newPropertyDeepList = getNewRefItem(
                newPropertyList,
                parentIdx,
                "children",
                dropChildIndex,
                newPropertiesComponent,
                childType as string
            )

            console.log("uppppp 10", newDragDropDeepList)
            console.log("puuuuu 10")

            setDragDropEditList(_.cloneDeep(newDragDropDeepList))
            setPropertiesEditList(_.cloneDeep(newPropertyDeepList))
            setFocusEditId({ id: elementId, parentId })
        }

        const [{}, drag] = useDrag(
            () => ({
                item: { childType, id, parentId },
                type: element ?? "",
                collect: (monitor: any) => ({}),
                end: (item: any, monitor: any) => {}
            }),
            [element]
        )

        const [{ isDragging }, drop] = useDrop(
            () => ({
                accept: _.concat(
                    DragDropAccecptElementType,
                    dragDropEditAcceptElementType
                ),
                hover: (item: any, monitor: any) => {
                    setIsHover(true)
                },
                drop: (_item: any, monitor: any) => {
                    if (monitor.canDrop()) {
                        if (!_item.id) {
                            createDropItem(monitor.getItemType())
                        } else updateDropItem(_item.id, _item.parentId)
                    }
                },
                collect: (monitor: any) => ({
                    isDragging: monitor.isOver()
                })
            }),
            [dragDropEditAcceptElementType, dragDropEditList]
        )

        useEffect(() => {
            if (!isDragging) setIsHover(false)
        }, [isDragging])

        const elementRef = useRef<any>()
        drag(drop(elementRef))

        const updateFocusEditComponent = () => {
            console.log("element id", id)
            if (element) setFocusEditId({ id, parentId })
        }

        const focusElement = useMemo(() => {
            if (!focusEditId.id || !element) return false
            return focusEditId?.id == id
        }, [focusEditId])

        return (
            <div
                ref={elementRef}
                className="h-100"
                style={{
                    background: isHover ? "var(--static-bg-primary)" : ""
                }}>
                <div
                    // ref={!readOnly ? subRef : null}
                    id={`${id}-${childType}`}
                    className={`d-flex w-100 h-100 s-column-grid ${!readOnly ? "s-dragging" : ""} 
                ${!isPreview ? "s-edit-area-border" : "border-none"}`}
                    style={{
                        flex: 1,
                        borderColor: focusElement ? "navy" : "#ABCFFF"
                    }}
                    onClick={() => {
                        updateFocusEditComponent()
                    }}>
                    <WrappedComponent
                        {...props}
                        className="z-30"
                        setFocusEditId={setFocusEditId}
                    />
                </div>
            </div>
        )
    }

withSubColumn.displayName = "withSubColumn"

export { withSubColumn }
