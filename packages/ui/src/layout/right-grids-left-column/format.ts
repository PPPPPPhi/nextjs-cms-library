import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { RightGridsLeftColumn } from "./layout"
import { RightGridsLeftColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "right-grids-left-column",
    icon: RightGridsLeftColumnSvg,
    title: "Right Grids Left Column"
}

export const RightGridsLeftColumnType = {
    firstLeftGrid: "right-grids-left-column-first-left",
    secondLeftGrid: "right-grids-left-column-second-left",
    rightColumn: "right-grids-left-column-column-right"
}

export const dragDropJson: DragDropJson = {
    element: "right-grids-left-column",
    component: RightGridsLeftColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: RightGridsLeftColumnType.firstLeftGrid
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: RightGridsLeftColumnType.secondLeftGrid
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: RightGridsLeftColumnType.rightColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "right-grids-left-column",
    label: "Right Grids Left Column",
    placeholder: "",
    value: "",
    type: "right-grids-left-column",
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: RightGridsLeftColumnType.firstLeftGrid
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: RightGridsLeftColumnType.secondLeftGrid
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: RightGridsLeftColumnType.rightColumn
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
