import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { LeftGridsRightColumn } from "./layout"
import { LeftGridsRightColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "left-grids-right-column",
    icon: LeftGridsRightColumnSvg,
    title: "Left Grids Right Column"
}

export const LeftGridsRightColumnType = {
    firstLeftGrid: "left-grids-right-column-first-left",
    secondLeftGrid: "left-grids-right-column-second-left",
    rightColumn: "left-grids-right-column-column-right"
}

export const dragDropJson: DragDropJson = {
    element: "left-grids-right-column",
    component: LeftGridsRightColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: LeftGridsRightColumnType.firstLeftGrid
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: LeftGridsRightColumnType.secondLeftGrid
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: LeftGridsRightColumnType.rightColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "left-grids-right-column",
    label: "Left Grids Right Column",
    placeholder: "",
    value: "",
    type: "left-grids-right-column",
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: LeftGridsRightColumnType.firstLeftGrid
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: LeftGridsRightColumnType.secondLeftGrid
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: LeftGridsRightColumnType.rightColumn
        }
    ]
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string(),
    children: z.array(
        z.object({
            element: z.string(),
            label: z.string(),
            placeholder: z.string(),
            value: z.string(),
            type: z.string()
        })
    )
})
