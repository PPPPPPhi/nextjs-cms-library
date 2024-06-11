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
         

            if (dragDropHistoryList.length > historyCapSize) {
                dragDropHistoryList.shift()
                propertiesHistoryList.shift()
           
                setToggle(!toggle)
            }

  

            setDragDropEditList(dragDropHistoryList[currentHistoryIndex])
            setPropertiesEditList(propertiesHistoryList[currentHistoryIndex])

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
