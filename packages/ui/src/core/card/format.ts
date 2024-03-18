import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { CardSvg } from "./svg"
import { Card } from "./widget"
import { z } from "zod"

export const selectionCardJson: SelectionJson = {
    element: "card",
    icon: CardSvg,
    title: "Card"
}

export const dragDropCardJson: DragDropJson = {
    element: "card",
    component: Card
}

export const propertyCardJson: PropertyJson = {
    element: "card",
    properties: [
        {
            label: "Title",
            placeholder: "Input here ...",
            value: "Card Title",
            type: "text"
        },
        {
            label: "Image",
            placeholder: "Input here ...",
            value: "",
            type: "image"
        },
        {
            label: "SubTitle",
            placeholder: "Input here ...",
            value: "Card SubTitle",
            type: "text"
        },
        {
            label: "Description",
            placeholder: "Input here ...",
            value: "Text Label",
            type: "text"
        },
        {
            label: "Text Color",
            placeholder: "",
            value: "#000000",
            type: "colorPicker"
        },
        {
            label: "Background Color",
            placeholder: "",
            value: "#FFFFFF",
            type: "colorPicker"
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
