import { useEffect, useState } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import * as _ from "lodash"

const useHistoryHook = () => {
    const {
        propertiesEditList,
        dragDropEditList,
        setDragDropHistoryList,
        setPropertiesHistoryList,
        dragDropHistoryList,
        propertiesHistoryList,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        setDragDropEditList,
        setPropertiesEditList
    } = useDisplayPanelContext()

    const [isSettle, setIsSettle] = useState(false)

    useEffect(() => {
        if (currentHistoryIndex === -1) {
            setCurrentHistoryIndex(0)
            return
        }

        const newPropertiesHistoryList = _.cloneDeep(propertiesHistoryList)
        const newDragDropHistoryList = _.cloneDeep(dragDropHistoryList)
        const versionSum = propertiesHistoryList?.length ?? 0

        if (
            versionSum !== 0 &&
            currentHistoryIndex < versionSum &&
            _.isEqual(
                propertiesEditList,
                propertiesHistoryList[currentHistoryIndex - 1]
            )
        ) {
            console.log("history restore", versionSum, currentHistoryIndex)
            return
        } else if (
            versionSum !== 0 &&
            _.isEqual(
                propertiesEditList,
                propertiesHistoryList[currentHistoryIndex - 1]
            )
        ) {
            console.log("history next step")
            return
        } else if (versionSum !== 0 && currentHistoryIndex < versionSum) {
            console.log("interrupt page", currentHistoryIndex)

            newDragDropHistoryList.splice(
                currentHistoryIndex,
                newDragDropHistoryList.length
            )
            newPropertiesHistoryList.splice(
                currentHistoryIndex,
                newPropertiesHistoryList.length
            )
        }

        newDragDropHistoryList.push(_.cloneDeep(dragDropEditList))
        newPropertiesHistoryList.push(_.cloneDeep(propertiesEditList))

        setDragDropHistoryList(_.cloneDeep(newDragDropHistoryList))
        setPropertiesHistoryList(_.cloneDeep(newPropertiesHistoryList))

        const version = currentHistoryIndex + 1

        setCurrentHistoryIndex(version)
    }, [propertiesEditList])

    useEffect(() => {
        if (currentHistoryIndex < 0) return

        const versionSum = propertiesHistoryList?.length ?? 0

        if (currentHistoryIndex !== 0 && currentHistoryIndex <= versionSum) {
            if (!isSettle) {
                setIsSettle(true)
                return
            }

            setDragDropEditList(
                _.cloneDeep(dragDropHistoryList?.[currentHistoryIndex - 1])
            )
            setPropertiesEditList(
                _.cloneDeep(propertiesHistoryList?.[currentHistoryIndex - 1])
            )
            console.log("restore history ... ")
        }
    }, [currentHistoryIndex])
}

export default useHistoryHook
