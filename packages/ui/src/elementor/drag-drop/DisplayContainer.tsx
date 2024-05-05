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

import { SelectionPanel } from "./selection-panel/SelectionPanel"
import { DragDropArea } from "./drag-drop-panel/DragDropArea"
import { DisplayPanelContextProvider } from "./DisplayPanelContext"
import { PropertiesPanelArea } from "./property-panel/PropertiesPanelArea"
import { PropertiesComponentProps } from "../../utils/index"
import { DisplayController } from "./control-bar/DisplayControlBar"
import { SubmissionButton } from "./control-bar/SubmissionButton"
import { PreviewButton } from "./control-bar/PreviewButton"
import { useParams } from "next/navigation"

type DisplayContainerProps = {
    pageJson: PropertiesComponentProps | {}
    submit: (pageData: PropertiesComponentProps[]) => Promise<void>
    setModal: Dispatch<SetStateAction<any>>
    setLoading: Dispatch<SetStateAction<boolean>>
    readOnly?: boolean
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
    const { readOnly } = props ?? {}

    console.log("props", props)

    return (
        <div className="d-flex h-100 w-100">
            <DisplayPanelContextProvider {...props}>
                <DisplayController />
                <DndProvider backend={HTML5Backend}>
                    <div
                        className="d-flex h-100 w-100 overflow-scroll justify-content-center"
                        style={{
                            background: "#FFF"
                        }}>
                        <PreviewButton />
                        {!readOnly && <SelectionPanel />}
                        {props.pageJson && (
                            <DragDropArea pageJson={props.pageJson ?? {}} />
                        )}
                        <SubmissionButton />
                    </div>
                </DndProvider>
                {!readOnly && <PropertiesPanelArea />}
            </DisplayPanelContextProvider>
        </div>
    )
}
