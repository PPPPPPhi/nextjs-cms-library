"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"

export const useDeleteComponent = () => {
    const {
        dragDropEditList,
        setDragDropEditList,
        propertiesEditList,
        setPropertiesEditList,
        deleteElementId,
        dragDropHistoryList,
        setDragDropHistoryList,
        propertiesHistoryList,
        setPropertiesHistoryList,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        historyCapSize,
        toggle,
        setToggle
    } = useDisplayPanelContext()

    useEffect(() => {
        if (!deleteElementId) return

        const { id, index } = deleteElementId ?? {}

        const duplicateDragDrop = dragDropEditList.at(index as number)
        const duplicateProperties = propertiesEditList.at(index as number)

        if (!duplicateDragDrop || !duplicateProperties) return

        const newDragDropList = _.cloneDeep(
            dragDropHistoryList[currentHistoryIndex]
        )
        const newPropertiesList = _.cloneDeep(
            propertiesHistoryList[currentHistoryIndex] ?? propertiesEditList
        )

        if (!newDragDropList) return
        if (!newPropertiesList) return

        newDragDropList.splice(index, 1)
        newPropertiesList.splice(index, 1)

        setDragDropEditList(newDragDropList)
        setPropertiesEditList(newPropertiesList)

        const snapShotDragDrop = _.cloneDeep(newDragDropList)
        const snapShotProperty = _.cloneDeep(newPropertiesList)

        setDragDropHistoryList([
            ...dragDropHistoryList.slice(0, currentHistoryIndex + 1),
            snapShotDragDrop
        ])
        setPropertiesHistoryList([
            ...propertiesHistoryList.slice(0, currentHistoryIndex + 1),
            snapShotProperty
        ])

        if (currentHistoryIndex < historyCapSize - 1) {
            setCurrentHistoryIndex(currentHistoryIndex + 1)
        }

        console.log(`list`, newDragDropList, newPropertiesList)
    }, [deleteElementId])

    return
}
