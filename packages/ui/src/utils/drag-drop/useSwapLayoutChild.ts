"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"
import { DragDropJson, PropertyJson } from "../../core/utils/type/index"
import {
    DragDropComponentProps,
    PropertiesComponentProps
} from "../../utils/index"

export const useSwapLayoutChild = () => {
    const {
        setDragDropEditList,
        setPropertiesEditList,
        dragDropHistoryList,
        setDragDropHistoryList,
        propertiesHistoryList,
        setPropertiesHistoryList,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        toggle,
        setToggle,
        swapLayoutChild
    } = useDisplayPanelContext()

    useEffect(() => {
        if (!swapLayoutChild) return

        const newId = uuid_v4()

        const { from, to, parentId } = swapLayoutChild
        console.log(`[hover] useSwapLayoutChild`, swapLayoutChild)
        try {
            const cloneCurrentDragDrop = _.cloneDeep(
                dragDropHistoryList[currentHistoryIndex]
            )
            const cloneCurrentProperty = _.cloneDeep(
                propertiesHistoryList[currentHistoryIndex]
            )

            const layoutDragDrop = cloneCurrentDragDrop?.find(
                (element: any) => element?.id == parentId
            )
            const layoutProperty = cloneCurrentProperty?.find(
                (element: any) => element?.id == parentId
            )

            if (!layoutDragDrop || !layoutProperty) return

            const parentIndex = _.findIndex(cloneCurrentProperty, [
                "id",
                parentId
            ])

            const swapChildInList = (
                parentDnd: DragDropComponentProps,
                parentProp: PropertiesComponentProps,
                from: string,
                to: string
            ) => {
                const fromChildIndex = parentProp?.children?.findIndex(
                    (elem: PropertyJson) => elem?.childType == from
                )

                const toChildIndex = parentProp?.children?.findIndex(
                    (elem: PropertyJson) => elem?.childType == to
                )

                const fromChildDnd = parentDnd?.elements?.find(
                    (elem: DragDropJson) => elem?.childType == from
                )

                const toChildDnd = parentDnd?.elements?.find(
                    (elem: DragDropJson) => elem?.childType == to
                )

                const fromChildProp = parentProp?.children?.find(
                    (elem: PropertyJson) => elem?.childType == from
                )

                const toChildProp = parentProp?.children?.find(
                    (elem: PropertyJson) => elem?.childType == to
                )

                _.set(parentDnd, `elements.${fromChildIndex}`, {
                    ...toChildDnd,
                    childType: from,
                    hoverIndex: fromChildIndex
                })
                _.set(parentDnd, `elements.${toChildIndex}`, {
                    ...fromChildDnd,
                    childType: to,
                    hoverIndex: toChildIndex
                })
                _.set(parentProp, `children.${fromChildIndex}`, {
                    ...toChildProp,
                    childType: from,
                    hoverIndex: fromChildIndex
                })
                _.set(parentProp, `children.${toChildIndex}`, {
                    ...fromChildProp,
                    childType: to,
                    hoverIndex: toChildIndex
                })

                return { parentDnd, parentProp }
            }

            const { parentDnd, parentProp } = swapChildInList(
                layoutDragDrop,
                layoutProperty,
                from,
                to
            )

            console.log(
                `[hover] cloneCurrentDragDrop`,
                cloneCurrentDragDrop,
                cloneCurrentProperty,
                parentIndex,
                parentDnd,
                parentProp
            )
            if (!parentDnd || !parentProp) return

            console.log(`[hover] AFTER SET TO CHILD: `, parentDnd, parentProp)

            const newDragDropList = _.cloneDeep(
                dragDropHistoryList[currentHistoryIndex]
            )

            const newPropertiesList = _.cloneDeep(
                propertiesHistoryList[currentHistoryIndex]
            )

            if (!newDragDropList) return
            if (!newPropertiesList) return

            newDragDropList[parentIndex] = parentDnd
            newPropertiesList[parentIndex] = parentProp
            console.log(
                `[hover] useSwapLayoutChild`,
                newDragDropList,
                newPropertiesList
            )

            const snapShotDragDrop = _.cloneDeep(newDragDropList)
            const snapShotProperty = _.cloneDeep(newPropertiesList)

            console.log("set dragDropEditList 9")

            setDragDropEditList(snapShotDragDrop)
            setPropertiesEditList(snapShotProperty)

            setDragDropHistoryList([
                ...dragDropHistoryList.slice(0, currentHistoryIndex + 1),
                newDragDropList
            ])
            setPropertiesHistoryList([
                ...propertiesHistoryList.slice(0, currentHistoryIndex + 1),
                newPropertiesList
            ])

            if (currentHistoryIndex < 9)
                setCurrentHistoryIndex(currentHistoryIndex + 1)

            console.log(
                `[hover] useSwapLayoutChild`,
                currentHistoryIndex,
                snapShotDragDrop,
                snapShotProperty
            )

            setToggle(!toggle)
        } catch (err) {
            console.log(`drop component in layout err`, err)
        }
    }, [swapLayoutChild])

    return
}
