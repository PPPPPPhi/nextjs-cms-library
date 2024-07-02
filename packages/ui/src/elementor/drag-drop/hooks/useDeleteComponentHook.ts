"use client"
import { useEffect } from "react"
import _ from "lodash"

import { useDisplayPanelContext } from "../../../index"

const useDeleteComponentHook = () => {
    const {
        dragDropEditList,
        setDragDropEditList,
        propertiesEditList,
        setPropertiesEditList,
        deleteElementId,
        setDeleteElementId
    } = useDisplayPanelContext()

    useEffect(() => {
        if (!deleteElementId) return
        const currentIdx = dragDropEditList?.findIndex(
            (l: any) => l.id === deleteElementId
        )

        const newDragDropList = [...dragDropEditList]
        newDragDropList.splice(currentIdx, 1)
        const newPropertyList = [...propertiesEditList]
        newPropertyList.splice(currentIdx, 1)

        setDragDropEditList(_.cloneDeep(newDragDropList))
        setPropertiesEditList(_.cloneDeep(newPropertyList))
        setDeleteElementId(null)
    }, [deleteElementId])

    return
}

export default useDeleteComponentHook
