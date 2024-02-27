import { EmptyLayoutGrid } from ".."
import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { TwoColumn } from "./layout"
import { TwoColumnSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "two-column",
    icon: TwoColumnSvg,
    title: "Two Column"
}

export const dragDropJson: DragDropJson = {
    element: "two-column",
    component: TwoColumn,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: "two-column-first"
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: "two-column-second"
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "two-column",
    label: "Two Column",
    placeholder: "Input here ...",
    value: "Morning World two-column",
    type: "two-column",
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: "two-column-first"
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: "two-column-second"
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

export enum TwoColumnChild {
    firstColumn = "two-column-first",
    secondColumn = "two-column-second"
}

export const TwoColumnChildType = {
    firstColumn: "two-column-first",
    secondColumn: "two-column-second"
}
