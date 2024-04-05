import { FC } from "react"
import {
    TwoColumn,
    ThreeColumn,
    LeftGridsRightColumn,
    BentoGrid,
    RightGridsLeftColumn
} from "../../layout"

export const layoutsComponentMap: Map<string, FC<any>> = new Map([
    ["two-column", TwoColumn],
    ["three-column", ThreeColumn],
    ["left-grids-right-column", LeftGridsRightColumn],
    ["right-grids-left-column", RightGridsLeftColumn],
    ["bento-grid", BentoGrid]
])

export const getLayoutsComponent = (type: string) =>
    layoutsComponentMap.get(type) ?? <></>
