import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { TextSvg } from "./svg"
import { Text } from "./widget"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "text",
    icon: TextSvg,
    title: "Text"
}

export const dragDropJson: DragDropJson = {
    element: "text",
    component: Text
}

export const propertyJson: PropertyJson = {
    element: "text",
    label: "Text Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "text"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
