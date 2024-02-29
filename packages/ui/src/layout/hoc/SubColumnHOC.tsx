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
    DragDropComponentProps
} from "@nextjs-cms-library/ui/index"

import { useMultiColumnsContext } from "../context/MultiColumnsContext"

enum DragDropButton {
    duplicate = "DUPLICATE",
    delete = "DELETE",
    add = "ADD"
}

type withSubColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    subColumnAcceptType: []
    // dropElement: React.Ref<any>
}

const withSubColumn =
    (WrappedComponent: React.FC<any>) => (props: withSubColumnProps) => {
        const {
            id,
            element,
            childType,
            component,
            hoverIndex,
            subColumnAcceptType
        } = props

        const {
            dragDropList,
            setDropComponentInLayout,
            setIsDragging,
            setIsInsertNested,
            focusEditId,
            setFocusEditId,
            setSwapLayoutChild
        } = useMultiColumnsContext()

        const hoverIndexRef = useRef<any>()

        const [isDragChild, setDragChild] = useState<string>("")

        const subColumnElem = document.getElementById(`${id}-${childType}`)

        useEffect(() => {
            console.log(
                `[subcolumn] isHover ${childType} ${id}`,
                focusEditId,
                subColumnElem,
                `${id}-${childType}`
            )

            if (!subColumnElem || !focusEditId?.childType) return

            if (focusEditId?.childType == childType || focusEditId?.id == id) {
                subColumnElem.style.backgroundColor = "#e2f5e1"
            } else {
                subColumnElem.style.background = ""
            }
        }, [focusEditId])

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
                    console.log(
                        `[subcolumn] two-column SECOND`,
                        monitor.getItemType(),
                        subColumnElem,
                        childType
                    )

                    setFocusEditId({ ...focusEditId, childType })
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
                        layoutId: id,
                        childType: childType
                    })
                    setFocusEditId({ ...focusEditId, childType: "" })
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
                    console.log(
                        `[subcolumn] two-column SECOND`,
                        monitor.getItemType(),
                        subColumnElem,
                        childType
                    )

                    setFocusEditId({ ...focusEditId, childType })
                    setIsDragging(true)
                    setDragChild(childType ?? "")
                },
                drop: (item: any, monitor: any) => {
                    console.log(
                        `[subcolumn] hoverComponent element end`,
                        monitor.getItemType(),
                        monitor.didDrop(),
                        childType
                    )

                    if (subColumnElem) subColumnElem.style.backgroundColor = ""

                    setIsDragging(false)
                    setDragChild("")
                    setIsInsertNested(true)
                    setSwapLayoutChild({
                        from: monitor.getItemType(),
                        to: childType
                    })
                    setFocusEditId({ ...focusEditId, childType: "" })
                }
            }),
            [subColumnAcceptType]
        )

        const elemRef = useRef<any>()

        dragSubColumn(dropSubColumn(dropNeightbour(elemRef)))

        return (
            <WrappedComponent
                {...props}
                subRef={elemRef}
                className="z-30"
                // dropElement={dropElement}
            />
        )
    }

withSubColumn.displayName = "withSubColumn"

export { withSubColumn }
