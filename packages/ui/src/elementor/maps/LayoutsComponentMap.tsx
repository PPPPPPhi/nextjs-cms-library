import { FC } from "react"
import {
    TwoColumn,
    ThreeColumn,
    LeftGridsRightColumn,
    BentoGrid,
    RightGridsLeftColumn,
    FiveColumn
} from "../../layout"

//@ts-ignore
export const layoutsComponentMap: Map<string, FC<any>> = new Map([
    ["two-column", TwoColumn],
    ["three-column", ThreeColumn],
    ["left-grids-right-column", LeftGridsRightColumn],
    ["right-grids-left-column", RightGridsLeftColumn],
    ["bento-grid", BentoGrid],
    ["five-column", FiveColumn]
])

export const getLayoutsComponent = (type: string) =>
    layoutsComponentMap.get(type) ?? <></>
