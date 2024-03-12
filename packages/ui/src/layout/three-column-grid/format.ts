import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { ThreeColumn } from "./layout"
import { ThreeColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "three-column",
    icon: ThreeColumnSvg,
    title: "Three Column"
}

export const ThreeColumnChildType = {
    firstColumn: "three-column-first",
    secondColumn: "three-column-second",
    thirdColumn: "three-column-third"
}

export const dragDropJson: DragDropJson = {
    element: "three-column",
    component: ThreeColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: ThreeColumnChildType.firstColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: ThreeColumnChildType.secondColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: ThreeColumnChildType.thirdColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "three-column",
    label: "Three Column",
    placeholder: "Input here ...",
    value: "Morning World three-column",
    type: "three-column",
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: ThreeColumnChildType.firstColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: ThreeColumnChildType.secondColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: ThreeColumnChildType.thirdColumn
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
