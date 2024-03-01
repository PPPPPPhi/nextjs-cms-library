import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { LayoutNameMap } from "./NameMap"
import { ThreeColumnJson } from "../layout/three-column-grid"
import { TwoColumnJson } from "../layout/two-column-grid"

export const selectionLayoutMap: Map<string, SelectionJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.selectionPanelJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.selectionPanelJson]
])

export const dragDropLayoutMap: Map<string, DragDropJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.dragDropJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.dragDropJson]
])

export const propertiesLayoutMap: Map<string, PropertyJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.propertyJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.propertyJson]
])