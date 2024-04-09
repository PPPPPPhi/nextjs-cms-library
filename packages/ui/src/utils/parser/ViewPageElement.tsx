"use client"

import React, { useEffect, useRef, useMemo, useCallback } from "react"
const { useDrop, useDragDropManager } = require("react-dnd")
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"
import { deepParseJson } from "deep-parse-json"
import {
    ParsePageContextProvider,
    useParsePageContext
} from "./ParsePageContext"
import { useParsePageJson } from "./useParsePageJson"
import { ViewPageElementType } from "../type"
import { DragDropJson, ViewPageElementChildType } from "../type/componentFormat"
import { WidgetPropertiesProps } from "../../core/utils/type"

type ViewPageElementWrapperType = {
    element: string
    type: string
    id: string
    index: string
    Component: React.FC<any>
    elements: ViewPageElementChildType[]
    properties: WidgetPropertiesProps[]
}

export const ViewPageElement: React.FC<ViewPageElementWrapperType> = ({
    element,
    type,
    id,
    index,
    Component,
    elements,
    properties
}) => {
    return (
        <div>
            {Component && (
                <Component
                    element={element}
                    type={type}
                    id={id}
                    elements={elements}
                    properties={properties}
                />
            )}
        </div>
    )
}

ViewPageElement.displayName = "ViewPageElement"
