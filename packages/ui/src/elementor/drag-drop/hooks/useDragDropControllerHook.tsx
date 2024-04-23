import { useMemo, useState } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"

const useDragDropControllerHook = () => {
    const { currentHistoryIndex, dragDropHistoryList, historyCapSize } =
        useDisplayPanelContext()

    const historyListSum = useMemo(
        () => dragDropHistoryList.length ?? 0,
        [dragDropHistoryList]
    )

    const isPreviousHistoryEnable = useMemo(() => {
        console.log("currentHistoryIndex", currentHistoryIndex)
        if (currentHistoryIndex === 1) return

        const isWithinRange =
            historyListSum - currentHistoryIndex < historyCapSize

        if (isWithinRange) return true
        else return false
    }, [historyListSum, currentHistoryIndex])

    const isNextHistoryEnable = useMemo(() => {
        if (currentHistoryIndex === historyListSum) return

        const isWithinRange = currentHistoryIndex < historyListSum
        if (isWithinRange) return true
        else return false
    }, [historyListSum, currentHistoryIndex])

    return {
        isPreviousHistoryEnable,
        isNextHistoryEnable
    }
}

export default useDragDropControllerHook
