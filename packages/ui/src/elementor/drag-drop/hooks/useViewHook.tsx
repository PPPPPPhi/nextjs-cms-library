import { useMemo } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"

const useViewHook = () => {
    const { isPreview, isHardPreview } = useDisplayPanelContext()

    const isViewModeOnly = useMemo(() => {
        if (!isPreview && !isHardPreview) return false
        else return true
    }, [])

    return { isViewModeOnly }
}

export default useViewHook
