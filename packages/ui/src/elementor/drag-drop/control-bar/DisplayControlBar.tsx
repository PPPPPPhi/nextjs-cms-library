import React, { useEffect, useRef, useState, useMemo } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import {
    CollpaseSvg,
    ExpandSvg,
    HomeSvg,
    MobileSvg,
    PenSvg,
    PreviewSvg,
    RedoSvg,
    ToolsSvg,
    UndoSvg,
    WebSvg
} from "./DisplayControlButtons"

type DisplayControllerButtonsProps = {
    svg: any
    handler: () => void
    className?: string
    style?: any
}

export const DisplayControllerButtons: React.FC<
    DisplayControllerButtonsProps
> = ({ svg, handler, style = {}, className = "" }) => {
    return (
        <div
            style={{ height: 50, width: 50, borderRadius: 25 }}
            onClick={handler}
            className={`flex flex-row justify-center ${className} cursor-pointer s-adminGradientBg shadow s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2`}>
            {svg}
        </div>
    )
}

type DisplayControllerProps = {}

export const DisplayController: React.FC<DisplayControllerProps> = (props) => {
    const {
        dragDropHistoryList,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        historyCapSize,
        isExpandView,
        setExpandView,
        isMobileView,
        setMobileView,
        isPreview,
        setPreview,
        focusEditId,
        setFocusEditId
    } = useDisplayPanelContext()

    const [displayAllButtons, setDisplayAllButtons] = useState<boolean>(false)

    const isDisplayAll = useMemo(() => {
        console.log(`is display all`, displayAllButtons)
        return displayAllButtons ? "flex" : "none"
    }, [displayAllButtons])

    const dimPrevious = useMemo(() => {
        if (currentHistoryIndex == 0) return true

        return false
    }, [currentHistoryIndex, dragDropHistoryList])

    const dimNext = useMemo(() => {
        if (currentHistoryIndex >= historyCapSize - 1) return true
        if (currentHistoryIndex == dragDropHistoryList.length - 1) return true

        return false
    }, [currentHistoryIndex, dragDropHistoryList])

    const navigatePreviousEdit = () => {
        if (dimPrevious) return
        if (currentHistoryIndex > 0)
            setCurrentHistoryIndex(currentHistoryIndex - 1)
    }

    const navigateNextEdit = () => {
        if (dimNext) return
        if (currentHistoryIndex < historyCapSize - 1)
            setCurrentHistoryIndex(currentHistoryIndex + 1)
    }

    const toggleExpandView = () => {
        setExpandView(!isExpandView)
    }

    const toggleMobileView = () => {
        setMobileView(!isMobileView)
    }

    const togglePreview = () => {
        setExpandView(!isPreview)
        setPreview(!isPreview)
    }

    const returnHomePage = () => {
        // ask save pop up
        // router.push(...)
    }

    const isExpandButton = useMemo(() => {
        if (isExpandView)
            setFocusEditId({ ...focusEditId, id: "", childType: "" })

        return !isExpandView ? (
            <ExpandSvg width={22} height={22} />
        ) : (
            <CollpaseSvg width={22} height={22} />
        )
    }, [isExpandView])

    const isMobileButton = useMemo(() => {
        return !isMobileView ? (
            <MobileSvg width={22} height={22} />
        ) : (
            <WebSvg width={22} height={22} />
        )
    }, [isMobileView])

    const isPreviewButton = useMemo(() => {
        return !isPreview ? (
            <PreviewSvg width={22} height={22} />
        ) : (
            <PenSvg width={22} height={22} />
        )
    }, [isPreview])

    return (
        <div
            className={`s-display-controller z-[1000]`}
            style={{ position: "fixed", bottom: 20 }}>
            <div className={`space-y-4`}>
                <div
                    className={`s-display-control-group flex flex-col space-y-4`}
                    style={{
                        display: isDisplayAll
                    }}>
                    <DisplayControllerButtons
                        svg={<HomeSvg width={22} height={22} />}
                        handler={() => setDisplayAllButtons(!displayAllButtons)}
                    />

                    <DisplayControllerButtons
                        svg={
                            <UndoSvg
                                width={22}
                                height={22}
                                color={dimPrevious ? "grey" : "currentColor"}
                            />
                        }
                        style={{
                            cursor: dimPrevious ? "not-allowed" : "pointer"
                        }}
                        handler={() => navigatePreviousEdit()}
                    />

                    <DisplayControllerButtons
                        svg={
                            <RedoSvg
                                width={22}
                                height={22}
                                color={dimNext ? "grey" : "currentColor"}
                            />
                        }
                        style={{ cursor: dimNext ? "not-allowed" : "pointer" }}
                        handler={() => navigateNextEdit()}
                    />

                    <DisplayControllerButtons
                        svg={isExpandButton}
                        handler={() => toggleExpandView()}
                    />

                    <DisplayControllerButtons
                        svg={isMobileButton}
                        handler={() => toggleMobileView()}
                    />

                    <DisplayControllerButtons
                        svg={isPreviewButton}
                        handler={() => togglePreview()}
                    />
                </div>

                <DisplayControllerButtons
                    svg={<ToolsSvg width={22} height={22} />}
                    className={"space-y-4"}
                    handler={() => setDisplayAllButtons(!displayAllButtons)}
                />
            </div>
        </div>
    )
}
