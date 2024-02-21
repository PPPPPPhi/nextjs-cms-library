import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { ElementNameMap } from "./NameMap"

import { TextJson } from ".."

export const selectionListMap: Map<string, SelectionJson> = new Map([
    [ElementNameMap.Text, TextJson.selectionPanelJson]
])

export const dragDropListMap: Map<string, DragDropJson> = new Map([
    [ElementNameMap.Text, TextJson.dragDropJson]
])

export const propertiesListMap: Map<string, PropertyJson> = new Map([
    [ElementNameMap.Text, TextJson.propertyJson]
])
