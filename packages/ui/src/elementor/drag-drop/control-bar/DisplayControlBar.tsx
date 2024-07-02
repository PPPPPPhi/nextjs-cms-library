import React, { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    FaWrench,
    FaArrowRotateRight,
    FaArrowRotateLeft,
    FaMobileScreen,
    FaEyeSlash,
    FaArrowsLeftRightToLine,
    FaComputer,
    FaArrowsToCircle,
    FaPen
} from "react-icons/fa6"

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
import { AdminActionButton } from "@nextjs-cms-library/admin-components/index"
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
        isHardPreview,
        setIsLayoutReady
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
        setIsLayoutReady(false)
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

    const mobileButton = useMemo(() => {
        const Component = !isMobileView ? FaMobileScreen : FaComputer
        return Component
    }, [isMobileView])

    const expandButton = useMemo(() => {
        const Component = !isExpandView
            ? FaArrowsLeftRightToLine
            : FaArrowsToCircle
        return Component
    }, [isExpandView])

    const previewButton = useMemo(() => {
        const Component = !isPreview || isHardPreview ? FaEyeSlash : FaPen
        return Component
    }, [isPreview, isHardPreview])

    return (
        <div
            className={`s-display-controller z-[1000]`}
            style={{
                position: "fixed",
                bottom: 20,
                display: "flex"
            }}>
            <div className="d-flex flex-column space-y-2">
                <div
                    className="flex-column space-y-2"
                    style={{
                        display: isDisplayControl ? "flex" : "none"
                    }}>
                    {/* <DisplayControllerButtons
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
                    /> */}
                    <AdminActionButton
                        inverseStyle
                        disabled={!isPreviousHistoryEnable}
                        label="Undo"
                        onClick={() => navigatePreviousEdit()}
                        Icon={FaArrowRotateLeft}
                        style={{ minHeight: 44 }}
                    />
                    <AdminActionButton
                        inverseStyle
                        disabled={!isNextHistoryEnable}
                        label="Redo"
                        onClick={() => navigateNextEdit()}
                        Icon={FaArrowRotateRight}
                        style={{ minHeight: 44 }}
                    />
                    <AdminActionButton
                        inverseStyle
                        label="Expand View"
                        onClick={() => toggleExpandView()}
                        Icon={expandButton}
                        style={{ minHeight: 44 }}
                    />
                    <AdminActionButton
                        inverseStyle
                        label="Mobile View"
                        onClick={() => toggleMobileView()}
                        Icon={mobileButton}
                        style={{ minHeight: 44 }}
                    />
                    <AdminActionButton
                        inverseStyle
                        label="Hide Panel"
                        onClick={() => togglePreview()}
                        Icon={previewButton}
                        style={{ minHeight: 44 }}
                    />
                </div>

                <AdminActionButton
                    label="Tools"
                    onClick={() => setIsDisplayControl(!isDisplayControl)}
                    Icon={FaWrench}
                    style={{ minHeight: 44 }}
                />
            </div>
        </div>
    )
}
