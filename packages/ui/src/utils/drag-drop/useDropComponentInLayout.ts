"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"
import {
    DragDropComponentProps,
    DragDropEditType,
    PropertiesComponentProps,
    PropertyEditType
} from "../../utils/index"

export const useDropComponentInLayout = () => {
    const {
        elementsList,
        dragDropList,
        propertiesList,
        dragDropEditList,
        setDragDropEditList,
        propertiesEditList,
        setPropertiesEditList,
        dropComponentInLayout,
        dragDropHistoryList,
        setDragDropHistoryList,
        propertiesHistoryList,
        setPropertiesHistoryList,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        toggle,
        setToggle
    } = useDisplayPanelContext()

    useEffect(() => {
        if (!dropComponentInLayout) return

        const newId = uuid_v4()

        const { dropComponent, layoutId, childType } = dropComponentInLayout
        console.log(`[hover] dropComponentInLayout`, dropComponentInLayout)
        try {
            // get drop component and its value json
            const newDragDropComponent: DragDropEditType = {
                ...(dragDropList?.get(dropComponent) as DragDropEditType),
                id: newId
            }

            const newPropertiesComponent: PropertyEditType = {
                ...(propertiesList?.get(dropComponent) as PropertyEditType),
                id: newId
            }

            const cloneCurrentDragDrop = _.cloneDeep(
                dragDropHistoryList[currentHistoryIndex]
            )
            const cloneCurrentProperty = _.cloneDeep(
                propertiesHistoryList[currentHistoryIndex]
            )

            if (!cloneCurrentDragDrop || !cloneCurrentProperty) return

            const layoutDragDrop = cloneCurrentDragDrop.find(
                (element: any) => element?.id == layoutId
            )
            const layoutProperty = cloneCurrentProperty.find(
                (element: any) => element?.id == layoutId
            )

            if (!layoutDragDrop || !layoutProperty) return

            const parentIndex = _.findIndex(cloneCurrentProperty, [
                "id",
                layoutId
            ])

            const dropChildInList = (
                parentDnd: DragDropComponentProps,
                parentProp: PropertiesComponentProps,
                childType: string,
                newChildDnd: DragDropEditType,
                newChildProp: PropertyEditType
            ) => {
                const dropChildIndex = _.findIndex(parentProp?.children, [
                    "childType",
                    childType
                ])

                _.set(parentDnd, `elements.${dropChildIndex}`, {
                    ...newChildDnd,
                    childType
                })

                _.set(parentProp, `children.${dropChildIndex}`, {
                    ...newChildProp,
                    childType
                })
                return { parentDnd, parentProp }
            }

            const { parentDnd, parentProp } = dropChildInList(
                layoutDragDrop,
                layoutProperty,
                childType,
                newDragDropComponent,
                newPropertiesComponent
            )

            console.log(`[hover] AFTER SET TO CHILD: `, parentDnd, parentProp)

            console.log(
                `[hover] cloneCurrentDragDrop`,
                cloneCurrentDragDrop,
                cloneCurrentProperty,
                parentIndex,
                parentDnd,
                parentProp
            )

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
                `[hover] dropComponentInLayout`,
                newDragDropList,
                newPropertiesList
            )
            setDragDropEditList(newDragDropList)
            setPropertiesEditList(newPropertiesList)

            const snapShotDragDrop = _.cloneDeep(newDragDropList)
            const snapShotProperty = _.cloneDeep(newPropertiesList)

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
                `[hover] dropComponentInLayout`,
                currentHistoryIndex,
                snapShotDragDrop,
                snapShotProperty
            )

            setToggle(!toggle)
        } catch (err) {
            console.log(`drop component in layout err`, err)
        }
    }, [dropComponentInLayout])

    return
}
