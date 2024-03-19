"use client"
import React, { useEffect, useState } from "react"

import _ from "lodash"

import { useDisplayPanelContext } from "../../index"

export const useNavigatePreviousNextStep = () => {
    const {
        dragDropHistoryList,
        propertiesHistoryList,
        dragDropEditList,
        setDragDropEditList,
        propertiesEditList,
        setPropertiesEditList,
        currentHistoryIndex,
        historyCapSize,
        toggle,
        setToggle
    } = useDisplayPanelContext()

    useEffect(() => {
        try {
            // console.log(`current history page at `, currentHistoryIndex)

            // check if exist cap size, when delete the oldest

            if (dragDropHistoryList.length != propertiesHistoryList.length)
                console.log(`err !`, dragDropHistoryList, propertiesHistoryList)

            if (dragDropHistoryList.length > historyCapSize) {
                dragDropHistoryList.shift()
                propertiesHistoryList.shift()
                console.log(`after pop dnd shift~~ `)
                setToggle(!toggle)
            }

            // const currentDnD = dragDropHistoryList[currentHistoryIndex]
            // const currentPro = propertiesHistoryList[currentHistoryIndex]

            console.log(
                "setPropertiesEditList  8",
                propertiesHistoryList[currentHistoryIndex]
            )
            setDragDropEditList(dragDropHistoryList[currentHistoryIndex])
            setPropertiesEditList(propertiesHistoryList[currentHistoryIndex])

            console.log(
                `view current`,
                currentHistoryIndex,
                dragDropHistoryList,
                propertiesHistoryList
            )
        } catch (err) {
            console.log(`useNavigatePreviousNextStep err`, err)
        }

        // return
    }, [
        currentHistoryIndex,
        toggle,
        dragDropHistoryList,
        propertiesHistoryList
    ])

    return
}
