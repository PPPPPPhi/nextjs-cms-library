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

            let parentDnd = _.cloneDeep(layoutDragDrop)
            let parentProp = _.cloneDeep(layoutProperty)

            const dropChildIndex = _.findIndex(parentProp?.children, [
                "childType",
                childType
            ])

            let newParentDragDrop = parentDnd
            let newParentProps = parentProp

            if (
                //@ts-ignore
                parentProp.children?.[dropChildIndex].element !==
                newPropertiesComponent.element
            ) {
                newParentDragDrop = {
                    ...parentDnd,
                    elements: parentDnd.elements?.map((l, idx) => {
                        if (idx === dropChildIndex) {
                            return {
                                ...newDragDropComponent,
                                childType
                            }
                        } else return l
                    })
                }

                newParentProps = {
                    ...parentProp,
                    children: parentProp.children?.map((l, idx) => {
                        if (idx === dropChildIndex) {
                            return {
                                ...newPropertiesComponent,
                                childType
                            }
                        } else return l
                    })
                }
            }

            const newDragDropList = _.cloneDeep(
                dragDropHistoryList[currentHistoryIndex]
            )

            const newPropertiesList = _.cloneDeep(
                propertiesHistoryList[currentHistoryIndex]
            )

            console.log(
                "setPropertiesEditList  6.0",
                newPropertiesList,
                propertiesHistoryList[currentHistoryIndex - 1]
            )

            console.log(
                "setPropertiesEditList  6.1",
                newPropertiesList,
                propertiesHistoryList[currentHistoryIndex]
            )

            if (!newDragDropList) return
            if (!newPropertiesList) return

            console.log("setPropertiesEditList 6.6", newDragDropList)

            newDragDropList[parentIndex] = newParentDragDrop
            newPropertiesList[parentIndex] = newParentProps

            console.log(
                `[hover] dropComponentInLayout`,
                newDragDropList,
                newPropertiesList
            )

            console.log("setPropertiesEditList  6", newPropertiesList)
            console.log("setPropertiesEditList  6.5", propertiesHistoryList)

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
