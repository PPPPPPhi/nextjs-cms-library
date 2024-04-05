import React, { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"

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

import useDragDropControllerHook from "../hooks/useDragDropControllerHook"
import useViewHook from "../hooks/useViewHook"

type DisplayControllerButtonsProps = {
    svg: any
    handler: () => void
    className?: string
    style?: any
}

export const DisplayControllerButtons: React.FC<
    DisplayControllerButtonsProps
> = ({ svg, handler, className = "" }) => {
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
        currentHistoryIndex,
        setCurrentHistoryIndex,
        isExpandView,
        setExpandView,
        isMobileView,
        setMobileView,
        setPreview,
        focusEditId,
        setFocusEditId,
        readOnly,
        isPreview,
        isHardPreview
    } = useDisplayPanelContext()

    const [isDisplayControl, setIsDisplayControl] = useState<boolean>(false)
    const router = useRouter()
    const { site } = useParams()

    const { isPreviousHistoryEnable, isNextHistoryEnable } =
        useDragDropControllerHook()

    const navigatePreviousEdit = () => {
        if (!isPreviousHistoryEnable) return
        setCurrentHistoryIndex(currentHistoryIndex - 1)
    }

    const navigateNextEdit = () => {
        if (!isNextHistoryEnable) return
        setCurrentHistoryIndex(currentHistoryIndex + 1)
    }

    const toggleExpandView = () => {
        if (isHardPreview) return
        setExpandView(!isExpandView)
    }

    const toggleMobileView = () => {
        setMobileView(!isMobileView)
    }

    const togglePreview = () => {
        if (isHardPreview) return

        setExpandView(!isPreview)
        setPreview(!isPreview)
    }

    const returnHomePage = () => {
        router.push(`/admin/${site}/pages`)
    }

    const getButtonColor = (isActive: boolean) =>
        isActive ? "currentColor" : "grey"
    const getButtonCursor = (isActive: boolean) =>
        isActive ? "pointer" : "not-allowed"

    const isExpandButton = useMemo(() => {
        if (isExpandView)
            setFocusEditId({ ...focusEditId, id: "", childType: "" })

        const Component = !isExpandView ? ExpandSvg : CollpaseSvg
        return (
            <Component
                width={22}
                height={22}
                color={getButtonColor(!isHardPreview)}
            />
        )
    }, [isExpandView])

    const isMobileButton = useMemo(() => {
        const Component = !isMobileView ? MobileSvg : WebSvg
        return <Component width={22} height={22} />
    }, [isMobileView])

    const isPreviewButton = useMemo(() => {
        const Component = !isPreview || isHardPreview ? PreviewSvg : PenSvg
        return (
            <Component
                width={22}
                height={22}
                color={getButtonColor(!isHardPreview)}
            />
        )
    }, [isPreview, isHardPreview])

    return (
        <div
            className={`s-display-controller z-[1000]`}
            style={{
                position: "fixed",
                bottom: 20,
                display: "flex"
            }}>
            <div className={`space-y-4`}>
                <div
                    className={`s-display-control-group flex flex-col space-y-4`}
                    style={{
                        display: isDisplayControl ? "flex" : "none"
                    }}>
                    <DisplayControllerButtons
                        svg={<HomeSvg width={22} height={22} />}
                        handler={() => returnHomePage()}
                    />

                    <DisplayControllerButtons
                        svg={
                            <UndoSvg
                                width={22}
                                height={22}
                                color={getButtonColor(
                                    isPreviousHistoryEnable as boolean
                                )}
                            />
                        }
                        style={{
                            cursor: getButtonCursor(
                                isPreviousHistoryEnable as boolean
                            )
                        }}
                        handler={() => navigatePreviousEdit()}
                    />

                    <DisplayControllerButtons
                        svg={
                            <RedoSvg
                                width={22}
                                height={22}
                                color={getButtonColor(
                                    isNextHistoryEnable as boolean
                                )}
                            />
                        }
                        style={{
                            cursor: getButtonCursor(
                                isNextHistoryEnable as boolean
                            )
                        }}
                        handler={() => navigateNextEdit()}
                    />

                    <DisplayControllerButtons
                        svg={isExpandButton}
                        handler={() => toggleExpandView()}
                        style={{
                            cursor: getButtonCursor(!isHardPreview as boolean)
                        }}
                    />

                    <DisplayControllerButtons
                        svg={isMobileButton}
                        handler={() => toggleMobileView()}
                    />

                    <DisplayControllerButtons
                        svg={isPreviewButton}
                        handler={() => togglePreview()}
                        style={{
                            cursor: getButtonCursor(!isHardPreview as boolean)
                        }}
                    />
                </div>

                <DisplayControllerButtons
                    svg={<ToolsSvg width={22} height={22} />}
                    className={"space-y-4"}
                    handler={() => setIsDisplayControl(!isDisplayControl)}
                />
            </div>
        </div>
    )
}
