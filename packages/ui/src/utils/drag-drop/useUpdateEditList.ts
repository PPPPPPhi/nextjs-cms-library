"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"
import { UpdateEditElementAction } from "./DragDropType"

export const useUpdateEditList = () => {
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
        setToggle,
        updateElementId
    } = useDisplayPanelContext()

    useEffect(() => {
        if (updateElementId?.action != UpdateEditElementAction.UPDATE) return

        const { id, index, values } = updateElementId ?? {}

        const newDragDropList = _.cloneDeep(
            dragDropHistoryList[currentHistoryIndex]
        )
        const newPropertiesList = _.cloneDeep(
            propertiesHistoryList[currentHistoryIndex]
        )

        if (!values || !newDragDropList || !newPropertiesList) return
        newPropertiesList[index] = values

        const snapShotDragDrop = _.cloneDeep(newDragDropList)
        const snapShotProperty = _.cloneDeep(newPropertiesList)

        setDragDropEditList(snapShotDragDrop)
        setPropertiesEditList(snapShotProperty)

        setPropertiesHistoryList([
            ...propertiesHistoryList.slice(0, currentHistoryIndex + 1),
            snapShotProperty
        ])
        setDragDropHistoryList([
            ...dragDropHistoryList.slice(0, currentHistoryIndex + 1),
            snapShotDragDrop
        ])
        if (currentHistoryIndex < historyCapSize - 1) {
            setCurrentHistoryIndex(currentHistoryIndex + 1)
        }
    }, [updateElementId])

    return
}
