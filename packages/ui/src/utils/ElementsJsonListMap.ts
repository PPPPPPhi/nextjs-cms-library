import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { TextJson } from ".."

export const selectionListMap: Map<string, SelectionJson> = new Map([
    ["text", TextJson.selectionPanelJson]
])

export const dragDropListMap: Map<string, DragDropJson> = new Map([
    ["text", TextJson.dragDropJson]
])

export const propertiesListMap: Map<string, PropertyJson> = new Map([
    ["text", TextJson.propertyJson]
])
