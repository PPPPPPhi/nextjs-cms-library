import { useEffect, useState } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"

const useDragDropOffsetHook = () => {
    const { dragDropEditList } = useDisplayPanelContext()

    const [offsetRefList, setOffsetRefList] = useState<number[]>([])
    const [containerY, setContainerY] = useState(0)

    useEffect(() => {
        const DragDropContainer = document.getElementById(
            "display-panel-drag-drop-area-container"
        )

        const recordScrollY = (event: any) => {
            if (DragDropContainer) setContainerY(DragDropContainer.scrollTop)
        }

        DragDropContainer?.addEventListener("scroll", recordScrollY)

        return () => {
            DragDropContainer?.removeEventListener("scroll", recordScrollY)
            setContainerY(0)
        }
    }, [])

    useEffect(() => {
        const DragDropContainer = document.getElementById(
            "display-panel-drag-drop-area"
        )

        let offsetArray: number[] = []
        if (DragDropContainer && DragDropContainer.children) {
            Array.apply(null, Array(DragDropContainer.children.length)).forEach(
                (l, idx) => {
                    const { top = 0, height = 0 } =
                        DragDropContainer.children[
                            idx
                        ]?.getBoundingClientRect() ?? {}
                    let componentHeight = top + height / 2 + containerY

                    offsetArray.push(componentHeight)
                }
            )
        }

        offsetArray.splice(offsetArray.length - 1, 1)
        setOffsetRefList(offsetArray)
    }, [dragDropEditList])

    return {
        containerY,
        offsetRefList
    }
}

export default useDragDropOffsetHook
