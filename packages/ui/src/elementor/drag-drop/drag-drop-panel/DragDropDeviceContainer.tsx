import { ReactNode } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { DisplayMobileGrid } from "../control-bar/DisplayMobileGrid"
import useViewHook from "../hooks/useViewHook"

interface DragDropDeviceContainerInterface {
    children: ReactNode
}

export const DragDropDeviceContainer: React.FC<
    DragDropDeviceContainerInterface
> = ({ children }) => {
    const { isMobileView, isPreview } = useDisplayPanelContext()

    if (isMobileView) return <DisplayMobileGrid>{children}</DisplayMobileGrid>
    else
        return (
            <div
                id="display-panel-drag-drop-area-container"
                className="h-100 w-100"
                style={
                    !isPreview
                        ? {
                              overflowY: "auto",
                              paddingTop: 30
                          }
                        : {}
                }>
                {children}
            </div>
        )
}
