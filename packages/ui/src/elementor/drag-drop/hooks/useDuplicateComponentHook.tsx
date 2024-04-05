"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"
import { DragDropEditType, PropertyEditType } from "../../../utils"

const useDuplicateComponentHook = () => {
    const {
        dragDropEditList,
        setDragDropEditList,
        propertiesEditList,
        setPropertiesEditList,
        duplicateElementId,
        setDuplicateElementId
    } = useDisplayPanelContext()

    useEffect(() => {
        if (!duplicateElementId) return

        const currentIdx = dragDropEditList?.findIndex(
            (l: any) => l.id === duplicateElementId
        )
        const currentItem = dragDropEditList?.find(
            (l: any) => l.id === duplicateElementId
        )
        const currentPropItem = propertiesEditList.find(
            (l: any) => l.id === duplicateElementId
        )

        const elementId = uuid_v4()
        const position = currentIdx + 1

        const newEditComponent: DragDropEditType = {
            ...(currentItem as DragDropEditType),
            id: elementId
        }
        const newPropertiesComponent: PropertyEditType = {
            ...(currentPropItem as PropertyEditType),
            id: elementId
        }

        const newDragDropList = [...dragDropEditList]
        //@ts-ignore
        newDragDropList.splice(position, 0, newEditComponent)
        const newPropertyList = [...propertiesEditList]
        //@ts-ignore
        newPropertyList.splice(position, 0, newPropertiesComponent)

        console.log("uppppp 7", newDragDropList)
        console.log("puuuuu 5")

        setDragDropEditList(_.cloneDeep(newDragDropList))
        setPropertiesEditList(_.cloneDeep(newPropertyList))

        setDuplicateElementId(null)
    }, [duplicateElementId])

    return
}

export default useDuplicateComponentHook
