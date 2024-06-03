import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { SixColumn } from "./layout"
import { SixColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "six-column",
    icon: SixColumnSvg,
    title: "Six Column"
}

export const SixColumnChildType = {
    firstColumn: "six-column-first",
    secondColumn: "six-column-second",
    thirdColumn: "six-column-third",
    forthColumn: "six-column-forth",
    fifthColumn: "six-column-fifth",
    sixthColumn: "six-column-sixth"
}

export const dragDropJson: DragDropJson = {
    element: "six-column",
    component: SixColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SixColumnChildType.firstColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SixColumnChildType.secondColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SixColumnChildType.thirdColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SixColumnChildType.forthColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SixColumnChildType.fifthColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: SixColumnChildType.sixthColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "six-column",
    label: "Six Column",
    placeholder: "Input here ...",
    value: "Morning World six-column",
    type: "six-column",
    properties: [
        {
            element_id: "six_column_bg_color",
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
            childType: SixColumnChildType.firstColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: SixColumnChildType.secondColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: SixColumnChildType.thirdColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: SixColumnChildType.forthColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: SixColumnChildType.fifthColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: SixColumnChildType.sixthColumn
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
