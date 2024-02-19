import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { LayoutNameMap } from "./NameMap"
import { ThreeColumnJson } from "../layout/three-column-grid"

export const selectionLayoutMap: Map<string, SelectionJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.selectionPanelJson]
])

export const dragDropLayoutMap: Map<string, DragDropJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.dragDropJson]
])

export const propertiesLayoutMap: Map<string, PropertyJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.propertyJson]
])
