import { useDisplayPanelContext } from "../DisplayPanelContext"
const { useDrop } = require("react-dnd")
import { DragDropAccecptType } from "@nextjs-cms-library/ui/index"
import { useEffect } from "react"
import _ from "lodash"
import { getLayoutsComponent } from "../../../elementor/maps/LayoutsComponentMap"
import { useParams } from "next/navigation"

interface DragDropLayoutContainerProps {
    element: any
    selfData: any
}

export const DragDropLayoutContainer: React.FC<DragDropLayoutContainerProps> = (
    props
) => {
    const { dragDropEditAcceptType, setIsOnHoverLayout, isMobileView } =
        useDisplayPanelContext()

    const { site } = useParams() ?? {}

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
            <Component
                {...props}
                isMobileView={isMobileView}
                isElementor
                site={site}
            />
        </div>
    )
}
