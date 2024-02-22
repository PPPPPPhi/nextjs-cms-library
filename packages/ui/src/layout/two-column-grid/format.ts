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
    elements: []
}

export const propertyJson: PropertyJson = {
    element: "two-column",
    label: "Two Column",
    placeholder: "Input here ...",
    value: "Morning World two-column",
    type: "two-column",
    children: []
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
