import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { SingleColumn } from "./layout"
import { SingleColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "single-column",
    icon: SingleColumnSvg,
    title: "Single Column"
}

export const SingleColumnChildType = {
    firstColumn: "single-column-first"
}

export const dragDropJson: DragDropJson = {
    element: "single-column",
    component: SingleColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SingleColumnChildType.firstColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "single-column",
    label: "Single Column",
    placeholder: "Input here ...",
    value: "Morning World single-column",
    type: "single-column",
    properties: [
        {
            element_id: "single_column_bg_color",
            label: "Background Color",
            placeholder: "",
            value: "",
            type: "color-picker"
        }
    ],
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: SingleColumnChildType.firstColumn
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
