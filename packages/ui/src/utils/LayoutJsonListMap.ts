import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { LayoutNameMap } from "./NameMap"
import { ThreeColumnJson } from "../layout/three-column-grid"
import { TwoColumnJson } from "../layout/two-column-grid"
import { LeftGridsRightColumnJson } from "../layout/left-grids-right-column"
import { BentoGridJson } from "../layout/bento-grids"

export const selectionLayoutMap: Map<string, SelectionJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.selectionPanelJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.selectionPanelJson],
    [
        LayoutNameMap.LeftGridsRightColumn,
        LeftGridsRightColumnJson.selectionPanelJson
    ],
    [
        LayoutNameMap.BentoGrid,
        BentoGridJson.selectionPanelJson
    ]
])

export const dragDropLayoutMap: Map<string, DragDropJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.dragDropJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.dragDropJson],
    [LayoutNameMap.LeftGridsRightColumn, LeftGridsRightColumnJson.dragDropJson],
    [LayoutNameMap.BentoGrid, BentoGridJson.dragDropJson]
])

export const propertiesLayoutMap: Map<string, PropertyJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.propertyJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.propertyJson],
    [LayoutNameMap.LeftGridsRightColumn, LeftGridsRightColumnJson.propertyJson],
    [LayoutNameMap.BentoGrid, BentoGridJson.propertyJson]
])
