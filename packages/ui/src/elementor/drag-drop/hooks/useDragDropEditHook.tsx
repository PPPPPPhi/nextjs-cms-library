import { useEffect } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { LayoutNameMap } from "@nextjs-cms-library/ui/index"

const useDragDropEditHook = () => {
    const {
        dragDropEditList,
        setDragDropEditAcceptType,
        setDragDropEditAcceptElementType
    } = useDisplayPanelContext()

    useEffect(() => {
        if (dragDropEditList.length) {
            const ids = dragDropEditList.map((l) => l.id)
            const layoutMaps = Object.values(LayoutNameMap)
            const elementIds = dragDropEditList
                .map((l) => {
                    // @ts-ignore
                    if (layoutMaps.includes(l.element)) return
                    else return l.id
                })
                .filter((k) => k)

            setDragDropEditAcceptElementType(elementIds as string[])
            setDragDropEditAcceptType(ids)
        } else setDragDropEditAcceptType([])
    }, [dragDropEditList])

    return {}
}

export default useDragDropEditHook
