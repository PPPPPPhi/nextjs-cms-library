"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"

export const useDuplicateComponent = () => {
    const {
        dragDropEditList,
        setDragDropEditList,
        propertiesEditList,
        setPropertiesEditList,
        duplicateElementId,
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
        if (!duplicateElementId) return

        const { id, index } = duplicateElementId ?? {}

        console.log(`[dragdropedit] being clone`, duplicateElementId)

        const duplicateDragDrop = dragDropEditList.at(index as number)
        const duplicateProperties = propertiesEditList.at(index as number)

        console.log(
            `[dragdropedit] being clone found `,
            currentHistoryIndex,
            duplicateDragDrop,
            duplicateProperties,
            dragDropHistoryList,
            propertiesHistoryList
        )
        if (!duplicateDragDrop || !duplicateProperties) return

        const newId = uuid_v4()

        const newDragDropList = _.cloneDeep(
            dragDropHistoryList[currentHistoryIndex]
        )
        const newPropertiesList = _.cloneDeep(
            propertiesHistoryList[currentHistoryIndex]
        )
        console.log(
            `[dragdropedit] before clone 2`,
            currentHistoryIndex,
            newDragDropList,
            newPropertiesList
        )

        if (!newDragDropList) return
        if (!newPropertiesList) return

        newDragDropList.splice(index, 0, { ...duplicateDragDrop, id: newId })
        newPropertiesList.splice(index, 0, {
            ...duplicateProperties,
            id: newId
        })

        console.log("setPropertiesEditList  7")

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

        console.log(
            `list`,
            newDragDropList,
            newPropertiesList,
            currentHistoryIndex,

            dragDropHistoryList.length
        )
    }, [duplicateElementId])

    return
}
