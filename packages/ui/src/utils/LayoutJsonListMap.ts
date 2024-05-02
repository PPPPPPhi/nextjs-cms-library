import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import { LayoutNameMap } from "./NameMap"
import { ThreeColumnJson } from "../layout/three-column-grid"
import { TwoColumnJson } from "../layout/two-column-grid"
import { LeftGridsRightColumnJson } from "../layout/left-grids-right-column"
import { RightGridsLeftColumnJson } from "../layout/right-grids-left-column"
import { BentoGridJson } from "../layout/bento-grids"
import { FiveColumnJson } from "../layout/five-column-grid"

export const selectionLayoutMap: Map<string, SelectionJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.selectionPanelJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.selectionPanelJson],
    [
        LayoutNameMap.LeftGridsRightColumn,
        LeftGridsRightColumnJson.selectionPanelJson
    ],
    [
        LayoutNameMap.RightGridsLeftColumn,
        RightGridsLeftColumnJson.selectionPanelJson
    ],
    [LayoutNameMap.BentoGrid, BentoGridJson.selectionPanelJson],
    [LayoutNameMap.FiveColumn, FiveColumnJson.selectionPanelJson]
])

export const dragDropLayoutMap: Map<string, DragDropJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.dragDropJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.dragDropJson],
    [LayoutNameMap.LeftGridsRightColumn, LeftGridsRightColumnJson.dragDropJson],
    [LayoutNameMap.RightGridsLeftColumn, RightGridsLeftColumnJson.dragDropJson],
    [LayoutNameMap.BentoGrid, BentoGridJson.dragDropJson],
    [LayoutNameMap.FiveColumn, FiveColumnJson.dragDropJson]
])

export const propertiesLayoutMap: Map<string, PropertyJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.propertyJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.propertyJson],
    [LayoutNameMap.LeftGridsRightColumn, LeftGridsRightColumnJson.propertyJson],
    [LayoutNameMap.RightGridsLeftColumn, RightGridsLeftColumnJson.propertyJson],
    [LayoutNameMap.BentoGrid, BentoGridJson.propertyJson],
    [LayoutNameMap.FiveColumn, FiveColumnJson.propertyJson]
])
