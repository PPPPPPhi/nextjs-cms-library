import RichTextEditor from "react-rte"
import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { RichTextSvg } from "./svg"
import { RichText } from "./widget"
import { z } from "zod"

export const selectionRichTextJson: SelectionJson = {
    element: "rich-text",
    icon: RichTextSvg,
    title: "RichText"
}

export const dragDropRichTextJson: DragDropJson = {
    element: "rich-text",
    component: RichText
}

export const propertyRichTextJson: PropertyJson = {
    element: "rich-text",
    type: "rich-text",
    properties: [
        {
            label: "Label",
            placeholder: "Input here ...",
            value: "Rich Text Editor",
            type: "text"
        },
        {
            label: "Value",
            placeholder: "Input here ...",
            value: "",
            type: "editor"
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
