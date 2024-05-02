import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { FiveColumn } from "./layout"
import { FiveColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "five-column",
    icon: FiveColumnSvg,
    title: "Five Column"
}

export const FiveColumnChildType = {
    firstColumn: "five-column-first",
    secondColumn: "five-column-second",
    thirdColumn: "five-column-third",
    forthColumn: "five-column-forth",
    fifthColumn: "five-column-fifth"
}

export const dragDropJson: DragDropJson = {
    element: "five-column",
    component: FiveColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: FiveColumnChildType.firstColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: FiveColumnChildType.secondColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: FiveColumnChildType.thirdColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: FiveColumnChildType.forthColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: FiveColumnChildType.fifthColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "five-column",
    label: "Five Column",
    placeholder: "Input here ...",
    value: "Morning World five-column",
    type: "five-column",
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: FiveColumnChildType.firstColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: FiveColumnChildType.secondColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: FiveColumnChildType.thirdColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: FiveColumnChildType.forthColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: FiveColumnChildType.fifthColumn
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
