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
import { SixColumnJson } from "../layout/six-column-grid"
import { BSSColumnJson } from "../layout/bss-column-grid"
import { PromotionGridJson } from "../layout/promotion-grid"
import { SingleColumnJson } from "../layout/single-column"

export const selectionLayoutMap: Map<string, SelectionJson> = new Map([
    [LayoutNameMap.SingleColumn, SingleColumnJson.selectionPanelJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.selectionPanelJson],
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.selectionPanelJson],
    [LayoutNameMap.FiveColumn, FiveColumnJson.selectionPanelJson],
    [LayoutNameMap.SixColumn, SixColumnJson.selectionPanelJson],
    [LayoutNameMap.BSSColumn, BSSColumnJson.selectionPanelJson],
    [
        LayoutNameMap.LeftGridsRightColumn,
        LeftGridsRightColumnJson.selectionPanelJson
    ],
    [
        LayoutNameMap.RightGridsLeftColumn,
        RightGridsLeftColumnJson.selectionPanelJson
    ],
    [LayoutNameMap.BentoGrid, BentoGridJson.selectionPanelJson],
    [LayoutNameMap.PromotionGrid, PromotionGridJson.selectionPanelJson]
])

export const dragDropLayoutMap: Map<string, DragDropJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.dragDropJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.dragDropJson],
    [LayoutNameMap.LeftGridsRightColumn, LeftGridsRightColumnJson.dragDropJson],
    [LayoutNameMap.RightGridsLeftColumn, RightGridsLeftColumnJson.dragDropJson],
    [LayoutNameMap.BentoGrid, BentoGridJson.dragDropJson],
    [LayoutNameMap.FiveColumn, FiveColumnJson.dragDropJson],
    [LayoutNameMap.SixColumn, SixColumnJson.dragDropJson],
    [LayoutNameMap.BSSColumn, BSSColumnJson.dragDropJson],
    [LayoutNameMap.PromotionGrid, PromotionGridJson.dragDropJson],
    [LayoutNameMap.SingleColumn, SingleColumnJson.dragDropJson]
])

export const propertiesLayoutMap: Map<string, PropertyJson> = new Map([
    [LayoutNameMap.ThreeColumn, ThreeColumnJson.propertyJson],
    [LayoutNameMap.TwoColumn, TwoColumnJson.propertyJson],
    [LayoutNameMap.LeftGridsRightColumn, LeftGridsRightColumnJson.propertyJson],
    [LayoutNameMap.RightGridsLeftColumn, RightGridsLeftColumnJson.propertyJson],
    [LayoutNameMap.BentoGrid, BentoGridJson.propertyJson],
    [LayoutNameMap.FiveColumn, FiveColumnJson.propertyJson],
    [LayoutNameMap.SixColumn, SixColumnJson.propertyJson],
    [LayoutNameMap.BSSColumn, BSSColumnJson.propertyJson],
    [LayoutNameMap.PromotionGrid, PromotionGridJson.propertyJson],
    [LayoutNameMap.SingleColumn, SingleColumnJson.propertyJson]
])
