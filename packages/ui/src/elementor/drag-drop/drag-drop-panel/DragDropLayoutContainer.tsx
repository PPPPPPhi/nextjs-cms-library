import { useDisplayPanelContext } from "../DisplayPanelContext"
const { useDrop } = require("react-dnd")
import { DragDropAccecptType } from "@nextjs-cms-library/ui/index"
import { useEffect } from "react"
import { getLayoutsComponent } from "../../../elementor/maps/LayoutsComponentMap"

interface DragDropLayoutContainerProps {
    element: any
}

export const DragDropLayoutContainer: React.FC<DragDropLayoutContainerProps> = (
    props
) => {
    const { dragDropEditAcceptType, setIsOnHoverLayout, isMobileView } =
        useDisplayPanelContext()

    const [{ isDragging }, drop] = useDrop(
        () => ({
            accept: _.concat(DragDropAccecptType, dragDropEditAcceptType),
            hover: (item: any, monitor: any) => {
                setIsOnHoverLayout(true)
            },
            drop: (_item: any, monitor: any) => {},
            collect: (monitor: any) => ({
                isDragging: monitor.isOver()
            })
        }),
        [dragDropEditAcceptType]
    )

    const Component = getLayoutsComponent(props?.element ?? "")

    useEffect(() => {
        if (!isDragging) setIsOnHoverLayout(false)
    }, [isDragging])

    return (
        <div ref={drop}>
            {/*@ts-ignore*/}
            <Component {...props} isMobileView={isMobileView} isElementor />
        </div>
    )
}
