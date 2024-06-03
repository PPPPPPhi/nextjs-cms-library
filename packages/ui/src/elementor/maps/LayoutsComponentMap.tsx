import { FC } from "react"
import {
    TwoColumn,
    ThreeColumn,
    LeftGridsRightColumn,
    BentoGrid,
    RightGridsLeftColumn,
    FiveColumn,
    SixColumn,
    BSSColumn,
    PromotionGrid,
    SingleColumn
} from "../../layout"

//@ts-ignore
export const layoutsComponentMap: Map<string, FC<any>> = new Map([
    ["two-column", TwoColumn],
    ["three-column", ThreeColumn],
    ["left-grids-right-column", LeftGridsRightColumn],
    ["right-grids-left-column", RightGridsLeftColumn],
    ["bento-grid", BentoGrid],
    ["five-column", FiveColumn],
    ["six-column", SixColumn],
    ["bss-column-grid", BSSColumn],
    ["promotion-grid", PromotionGrid],
    ["single-column", SingleColumn]
])

export const getLayoutsComponent = (type: string) =>
    layoutsComponentMap.get(type) ?? <></>

export const isLayoutComponent = (type: string) =>
    !!layoutsComponentMap.get(type)
