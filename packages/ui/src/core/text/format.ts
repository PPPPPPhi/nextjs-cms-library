import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { TextSvg } from "./svg"
import { Text } from "./widget"
import { z } from "zod"

export const selectionTextJson: SelectionJson = {
    element: "text",
    icon: TextSvg,
    title: "Text"
}

export const dragDropTextJson: DragDropJson = {
    element: "text",
    component: Text
}

export const propertyTextJson: PropertyJson = {
    element: "text",
    properties: [
        {
            label: "Label",
            placeholder: "Input here ...",
            value: "Text Label",
            type: "text"
        },
        {
            label: "Value",
            placeholder: "Input here ...",
            value: "Morning World",
            type: "text"
        },
        {
            label: "Font",
            placeholder: "Input here ...",
            value: "Text Label",
            type: "text"
        },
        {
            label: "A",
            placeholder: "Input here ...",
            value: "Morning World",
            type: "text"
        }
    ]
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
