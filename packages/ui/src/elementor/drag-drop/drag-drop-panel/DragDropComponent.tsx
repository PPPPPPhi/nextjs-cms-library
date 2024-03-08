import React, {
    useCallback,
    useRef,
    useMemo,
    useState,
    useEffect,
    Ref
} from "react"
const { useDrag, useDrop, DragPreviewImage } = require("react-dnd")
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import {
    DragDropAccecptType,
    LayoutNameMap,
    MultiColumnsContextProvider
} from "@nextjs-cms-library/ui/index"
import { DragDropComponentProps, PropertyEditType } from "../../../utils/index"
import { DuplicateSvg, DeleteSvg, DraggingPreview } from "./index"

enum DragDropButton {
    duplicate = "DUPLICATE",
    delete = "DELETE",
    add = "ADD"
}

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
            style={{ height: 30, width: 30, borderRadius: 25 }}
            className={`flex flex-row justify-center cursor-pointer text-white shadow 
                font-medium rounded-full text-sm p-2.5 text-center inline-flex 
                items-center me-2 s-adminGradientBg`}>
            {buttonType == DragDropButton.duplicate && <DuplicateSvg />}
            {buttonType == DragDropButton.delete && <DeleteSvg />}
            {buttonType == DragDropButton.add && <span>Move To Here</span>}
        </div>
    )
}

export const DragDropComponent: React.FC<DragDropComponentProps> = (
    props: DragDropComponentProps
) => {
    const { id, element, elements, component, hoverIndex } = props
    const ref = useRef<any>()
    const {
        dragDropEditAcceptType,
        dragDropList,
        setReOrderDropInfo,
        reOrderDropInfo,
        setIsDragging,
        setFocusEditId,
        propertiesEditList,
        setDeleteElementId,
        setDuplicateElementId,
        focusEditId,
        setDropComponentInLayout,
        setSwapLayoutChild,
        toggle,
        propertiesHistoryList,
        dragDropEditList,
        dragDropHistoryList,
        currentHistoryIndex,
        setInsertDropInfo,
        setIsInsert,
        setIsReOrder,
        setIsInsertNested,
        isPreview,
        readOnly
    } = useDisplayPanelContext()

    const [isDropHoverTop, setDropHoverTop] = useState<boolean>(false)
    const [isDropHoverBottom, setDropHoverBottom] = useState<boolean>(false)
    const [hoverClientY, setHoverClientY] = useState<number>(0)
    const [hoverMiddleY, setHoverMiddleY] = useState<number>(0)
    const [triggerDivider, setTriggerDivider] = useState<boolean>(false)

    const isLayout = useMemo(() => {
        // @ts-ignore
        return Object.values(LayoutNameMap).includes(element)
    }, [element])

    const allowDisplay = useMemo(() => {
        return focusEditId?.id == id ? "flex" : "none"
    }, [focusEditId])

    // drag drop the component list
    const [{ isDragging, currentItem }, drag] = useDrag(() => ({
        item: { id },
        type: id,
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
            currentItem: monitor.getItem()
        }),
        end: (item: any, monitor: any) => {
            console.log(`end dragging`)
            setIsDragging(false)
        }
    }))

    const [{ canDrop, isOver }, drop, preview] = useDrop(
        () => ({
            accept: dragDropEditAcceptType,
            collect: (monitor: any) => ({
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver()
            }),
            hover: (item: any, monitor: any) => {
                setIsDragging(true)
                // handleHoverHeight(monitor)

                return updateHoverDivider(monitor)
            },
            drop: (item: any, monitor: any) => {
                setDropHoverTop(false)
                setDropHoverBottom(false)

                // handleHoverHeight(monitor)

                return hoverComponent(item, monitor)
            }
        }),
        [dragDropEditAcceptType]
    )

    const selfData = useMemo(() => {
        const data = propertiesEditList.find(
            (element: PropertyEditType) => element?.id == id
        )

        return data
    }, [propertiesHistoryList, isDragging, toggle, currentHistoryIndex])

    const hoverComponent = (item: any, monitor: any) => {
        if (!item || !monitor) return

        console.log(
            `[hover] hoverComponent new accept ids`,
            hoverIndex,
            monitor.getItem(),
            monitor.getItemType(),
            monitor.didDrop()
        )

        const afterIndex: number = hoverIndex
        const whereRU = dragDropEditList.find(
            (e: any) => e?.id == monitor.getItemType()
        )

        setIsInsert(false)
        setIsReOrder(true)
        setReOrderDropInfo({
            ...reOrderDropInfo,
            before: whereRU?.hoverIndex,
            after: afterIndex
        })
        return
    }

    const updateFocusEditComponent = useCallback(() => {
        if (isLayout || readOnly) return
        if (focusEditId?.id == id) return

        console.log(`[edit] before set focus`, focusEditId)

        setFocusEditId({ ...focusEditId, id })
    }, [focusEditId])

    const focusElement = useMemo(() => {
        return focusEditId?.id == id
    }, [focusEditId])

    const duplicateComponent = () => {
        setDuplicateElementId({ id, index: hoverIndex })
    }

    const deleteComponent = () => {
        setDeleteElementId({ id, index: hoverIndex })
    }

    const [{}, dropBetween = drop] = useDrop(
        () => ({
            accept: DragDropAccecptType,
            collect: (monitor: any) => ({
                canDrop: monitor.canDrop()
            }),
            hover: (item: any, monitor: any) => {
                setIsDragging(true)
                setIsInsert(!monitor.didDrop())
                setIsInsertNested(monitor.didDrop())
                // console.log(
                //     `[hover] item`,
                //     monitor.getItem(),
                //     monitor.getItemType()
                // )
                console.log(
                    `[hover] dropBetween`,
                    monitor.didDrop(),
                    monitor.getItemType() == id
                )
                updateHoverDivider(monitor, false)
            },
            drop: (item: any, monitor: any) => {
                console.log(`[hover] hoverComponent drop between `)
                console.log(
                    `[hover] hoverComponent dropBetween end`,
                    monitor.didDrop()
                )
                setIsDragging(false)
                setDropHoverTop(false)
                setDropHoverBottom(false)
                setIsReOrder(false)
                setIsInsert(true)

                // setDropComponentInLayout({
                //     dropComponent: monitor.getItemType(),
                //     layoutId: id
                // })
                handleDropComponents(monitor, false)
            }
        }),
        [dragDropList]
    )

    const updateHoverDivider = (monitor: any, withinArea = true) => {
        const afterIndex: number = hoverIndex

        const whereRU = dragDropEditList.find(
            (e: any) => e?.id == monitor.getItemType()
        )

        const whereIndex = whereRU?.hoverIndex as number

        // console.log(
        //     "[hover] updateHoverDivider",
        //     whereRU?.hoverIndex,
        //     afterIndex,
        //     monitor.getItemType() == id,
        //     monitor.isOver()
        // )

        if (
            !monitor.isOver() ||
            whereIndex == afterIndex ||
            monitor.getItemType() == id
        ) {
            setDropHoverBottom(false)
            setDropHoverTop(false)
            return
        }

        if (whereIndex < afterIndex) {
            setDropHoverBottom(true)
            setDropHoverTop(false)
            setTriggerDivider(!triggerDivider)
            return
        }

        setDropHoverBottom(false)
        setDropHoverTop(true)
        setTriggerDivider(!triggerDivider)
        return
    }

    const handleDropComponents = (monitor: any, withinArea = true) => {
        const afterIndex: number = hoverIndex
        const beforeIndex: number = monitor.getItemType()

        const whereRU = dragDropEditList.find(
            (e: any) => e?.id == monitor.getItemType()
        )

        const whereIndex = whereRU?.hoverIndex as number

        if (monitor.didDrop()) return

        if (withinArea) {
            setReOrderDropInfo({
                ...reOrderDropInfo,
                before: whereRU?.hoverIndex,
                after: afterIndex
            })
        } else {
            setIsInsert(!monitor.didDrop())
            setIsInsertNested(monitor.didDrop())
            setInsertDropInfo({
                type: monitor.getItemType(),
                dropAt: hoverIndex
            })
        }
    }

    const resetDivider = useCallback(() => {
        if (isDragging) return

        console.log(
            `[reset] isOver isDragging`,
            isDropHoverTop,
            isDropHoverBottom
        )

        setDropHoverTop(false)
        setDropHoverBottom(false)
    }, [triggerDivider])

    useEffect(() => {
        document.addEventListener("mouseout", resetDivider)
        document.addEventListener("mouseleave", resetDivider)
        document.addEventListener("dragend", resetDivider)

        return () => {
            document.removeEventListener("mouseout", resetDivider)
            document.removeEventListener("mouseleave", resetDivider)
            document.removeEventListener("dragend", resetDivider)
        }
    }, [])

    const dragTopPreview = useMemo(() => {
        if (!isDropHoverTop) return

        return (
            <div
                className="s-drag-drop-card h-40"
                style={{ backgroundColor: "#e2f5e1" }}>
                <DraggingPreview />
            </div>
        )
    }, [isDropHoverTop])

    const dragBottomPreview = useMemo(() => {
        if (!isDropHoverBottom) return

        return (
            <div
                className="s-drag-drop-card h-40 bg-emerald-100"
                style={{ backgroundColor: "#e2f5e1" }}>
                <DraggingPreview />
            </div>
        )
    }, [isDropHoverBottom])

    drag(drop(dropBetween(ref)))

    return (
        <div>
            <DragPreviewImage connect={preview} src={"./drag.png"} />
            <div
                id={`edit-${id}`}
                ref={!readOnly ? ref : null}
                className={`${!readOnly ? "s-dragging" : ""}`}
                style={{
                    borderTop: isDropHoverTop ? "solid darkgrey" : "none",
                    borderBottom: isDropHoverBottom ? "solid darkgrey" : "none"
                }}>
                {dragTopPreview}

                <div
                    style={{
                        display: allowDisplay,
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
                    onClick={() => updateFocusEditComponent()}
                    // onMouseDown={updateFocusEditComponent}
                    className={`s-drag-drop-card`}
                    style={{
                        padding: 20,
                        borderColor: focusElement ? "navy" : "transparent"
                    }}>
                    {!isLayout && component && (
                        <div>
                            {component({
                                ...selfData,
                                elements: elements
                                // dropRef: null
                            })}
                        </div>
                    )}
                    {isLayout && (
                        <MultiColumnsContextProvider
                            {...props}
                            selfData={selfData}
                            isPreview={isPreview}
                            dragDropList={dragDropList}
                            focusEditId={focusEditId}
                            setFocusEditId={setFocusEditId}
                            setDropComponentInLayout={setDropComponentInLayout}
                            setIsDragging={setIsDragging}
                            setIsInsertNested={setIsInsertNested}
                            setSwapLayoutChild={setSwapLayoutChild}
                            setIsReOrder={
                                setIsReOrder
                            }></MultiColumnsContextProvider>
                    )}
                </div>

                {dragBottomPreview}
            </div>
        </div>
    )
}

DragDropComponent.displayName = "DragDropComponent"
