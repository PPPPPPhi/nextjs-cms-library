"use client"

import React, {
    useEffect,
    useRef,
    useState,
    Dispatch,
    SetStateAction
} from "react"
const { DndProvider, DragPreviewImage } = require("react-dnd")
const { HTML5Backend } = require("react-dnd-html5-backend")

import { DisplayPanelContextProvider } from "./DisplayPanelContext"
import { PropertiesComponentProps } from "../../utils/index"
import { DisplayController } from "./control-bar/DisplayControlBar"
import { DisplayContainerWrapper } from "./DisplayContainerWrapper"

type DisplayContainerProps = {
    pageJson: PropertiesComponentProps | {}
    submit: (pageData: PropertiesComponentProps[]) => Promise<void>
    setModal: Dispatch<SetStateAction<any>>
    setLoading: Dispatch<SetStateAction<boolean>>
    readOnly?: boolean
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
    const { readOnly } = props ?? {}

    return (
        <div className="d-flex h-100 w-100">
            <DisplayPanelContextProvider {...props}>
                <DisplayController />
                <DndProvider backend={HTML5Backend}>
                    <DisplayContainerWrapper pageJson={props?.pageJson} />
                </DndProvider>
            </DisplayPanelContextProvider>
        </div>
    )
}
