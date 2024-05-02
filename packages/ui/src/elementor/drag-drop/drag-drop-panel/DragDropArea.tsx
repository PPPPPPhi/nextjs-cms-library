"use client"
import React, { useMemo, useRef, useEffect } from "react"
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { DragDropAreaContent } from "./DragDropAreaContent"
import { DragDropDeviceContainer } from "./DragDropDeviceContainer"
import useDefaultPageHook from "../hooks/useDefaultPageHook"
import useHistoryHook from "../hooks/useHistoryHook"
import { PropertiesComponentProps } from "@nextjs-cms-library/ui/index"
import useViewHook from "../hooks/useViewHook"

interface DragDropAreaInterface {
    pageJson: {} | PropertiesComponentProps
}

export const DragDropArea: React.FC<DragDropAreaInterface> = ({ pageJson }) => {
    const { isPreview } = useDisplayPanelContext()

    const scrollRef = useRef<any>()

    const padding = useMemo(() => (isPreview ? 200 : 350), [isPreview])

    useHistoryHook()
    useDefaultPageHook(pageJson)

    return (
        <div
            id="page-drag-drop-area"
            ref={scrollRef}
            className="d-flex w-100 h-100 justify-content-center"
            style={{
                paddingLeft: padding,
                paddingRight: padding
            }}>
            <DragDropDeviceContainer>
                <DragDropAreaContent />
            </DragDropDeviceContainer>
        </div>
    )
}

DragDropArea.displayName = "DragDropArea"
