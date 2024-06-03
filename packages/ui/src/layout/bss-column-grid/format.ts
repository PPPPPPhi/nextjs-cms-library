import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { BSSColumn } from "./layout"
import { BSSColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "bss-column-grid",
    icon: BSSColumnSvg,
    title: "BSS Column"
}

export const BSSColumnChildType = {
    firstColumn: "bss-column-first",
    secondColumn: "bss-column-second",
    thirdColumn: "bss-column-third"
}

export const dragDropJson: DragDropJson = {
    element: "bss-column-grid",
    component: BSSColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BSSColumnChildType.firstColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BSSColumnChildType.secondColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BSSColumnChildType.thirdColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "bss-column-grid",
    label: "bss Column",
    placeholder: "Input here ...",
    value: "Morning World bss-column",
    type: "bss-column-grid",
    properties: [
        {
            element_id: "bss_column_bg_color",
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
            childType: BSSColumnChildType.firstColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BSSColumnChildType.secondColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BSSColumnChildType.thirdColumn
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
