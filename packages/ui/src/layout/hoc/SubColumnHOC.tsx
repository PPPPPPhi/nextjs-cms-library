import React, {
    useCallback,
    useRef,
    useMemo,
    useState,
    useEffect,
    Ref,
    Children
} from "react"
const { useDrag, useDrop } = require("react-dnd")

import _, { after, before } from "lodash"

import {
    DragDropJson,
    SelectionJson,
    DragDropAccecptType,
    LayoutNameMap,
    TwoColumnChildType,
    DragDropComponentProps,
    useDisplayPanelContext
} from "@nextjs-cms-library/ui/index"

import { useMultiColumnsContext } from "../context/index"

type withSubColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    subColumnAcceptType: []
    parentId: string
    // dropElement: React.Ref<any>
}

const withSubColumn =
    (WrappedComponent: React.FC<any>) => (props: withSubColumnProps) => {
        const {
            id,
            parentId,
            element,
            childType,
            component,
            hoverIndex,
            subColumnAcceptType
        } = props

        const { readOnly } = useDisplayPanelContext()

        const {
            dragDropList,
            setDropComponentInLayout,
            setIsDragging,
            setIsInsertNested,
            focusEditId,
            setFocusEditId,
            setSwapLayoutChild,
            setIsReOrder
        } = useMultiColumnsContext()

        const hoverIndexRef = useRef<any>()

        const [isDragChild, setDragChild] = useState<string>("")

        const subColumnElem = document.getElementById(`${id}-${childType}`)

        useEffect(() => {
            // console.log(
            //     `[subcolumn] isHover ${childType} ${id}`,
            //     focusEditId,
            //     subColumnElem,
            //     // `${id}-${childType}`,
            //     parentId
            // )

            if (!subColumnElem || !focusEditId?.childType) return

            if (
                focusEditId?.childType == childType &&
                focusEditId?.id == parentId
            ) {
                subColumnElem.style.backgroundColor = "#e2f5e1"
            } else {
                subColumnElem.style.background = ""
            }
        }, [focusEditId, parentId])

        // drag drop the component list
        const [{ isDragging, currentItem }, dragSubColumn] = useDrag(() => ({
            item: { childType },
            type: childType ?? "",
            collect: (monitor: any) => ({
                isDragging: !!monitor.isDragging(),
                currentItem: monitor.getItem()
            }),
            end: (item: any, monitor: any) => {
                console.log(`end dragging`)
                setIsDragging(false)
                hoverIndexRef.current = null
            }
        }))

        const [{}, dropSubColumn] = useDrop(
            () => ({
                accept: DragDropAccecptType,
                collect: (monitor: any) => ({
                    canDrop: monitor.canDrop()
                }),
                hover: (item: any, monitor: any) => {
                    // console.log(
                    //     `[subcolumn] two-column SECOND`,
                    //     monitor.getItemType(),
                    //     subColumnElem,
                    //     childType
                    // )

                    setFocusEditId({
                        ...focusEditId,
                        childType,
                        id: parentId
                    })
                    setIsDragging(true)
                    setDragChild(childType ?? "")
                },
                drop: (item: any, monitor: any) => {
                    console.log(
                        `[subcolumn] hoverComponent element end`,
                        monitor.getItemType(),
                        monitor.didDrop()
                    )

                    if (subColumnElem) subColumnElem.style.backgroundColor = ""

                    setIsDragging(false)
                    setDragChild("")
                    setIsInsertNested(true)
                    setDropComponentInLayout({
                        dropComponent: monitor.getItemType(),
                        layoutId: parentId,
                        childType: childType
                    })
                }
            }),
            [subColumnAcceptType]
        )

        const [{}, dropNeightbour] = useDrop(
            () => ({
                accept: subColumnAcceptType ?? "default",
                collect: (monitor: any) => ({
                    canDrop: monitor.canDrop()
                }),
                hover: (item: any, monitor: any) => {
                    // console.log(
                    //     `[subcolumn] two-column SECOND`,
                    //     monitor.getItemType(),
                    //     subColumnElem,
                    //     childType,
                    //     parentId
                    // )

                    setFocusEditId({
                        ...focusEditId,
                        childType,
                        id: parentId
                    })
                    setIsDragging(true)
                    setDragChild(childType ?? "")
                },
                drop: (item: any, monitor: any) => {
                    console.log(
                        `[subcolumn] hoverComponent element end`,
                        monitor.getItemType(),
                        monitor.didDrop(),
                        childType,
                        parentId
                    )

                    if (subColumnElem) subColumnElem.style.backgroundColor = ""

                    setIsDragging(false)
                    setDragChild("")
                    setIsReOrder(false)
                    setSwapLayoutChild({
                        from: monitor.getItemType(),
                        to: childType ?? "",
                        parentId
                    })
                }
            }),
            [subColumnAcceptType]
        )

        const elemRef = useRef<any>()

        dragSubColumn(dropSubColumn(dropNeightbour(elemRef)))

        return <WrappedComponent {...props} subRef={elemRef} className="z-30" />
    }

withSubColumn.displayName = "withSubColumn"

export { withSubColumn }
