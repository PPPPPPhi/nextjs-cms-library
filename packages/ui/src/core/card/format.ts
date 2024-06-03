import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { CardSvg } from "./svg"
import { Card } from "./widget"
import { string, z } from "zod"

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
    type: "card",
    properties: [
        {
            element_id: "card_label",
            label: "Title",
            placeholder: "Input here ...",
            value: "Card Title",
            type: "text"
        },
        {
            element_id: "card_image_src",
            label: "Image",
            placeholder: "Input here ...",
            value: "",
            type: "image"
        },
        {
            element_id: "card_image_position",
            label: "Position",
            value: "contain",
            type: "select",
            options: [
                { label: "Contain", value: "contain" },
                { label: "Cover", value: "cover" },
                { label: "Fill", value: "fill" }
            ]
        },
        {
            element_id: "card_subtitle",
            label: "SubTitle",
            placeholder: "Input here ...",
            value: "Card SubTitle",
            type: "text"
        },
        {
            element_id: "card_description",
            label: "Description",
            placeholder: "Input here ...",
            value: "Text Label",
            type: "text"
        },
        {
            element_id: "card_text_color",
            label: "Text Color",
            placeholder: "",
            value: "#000000",
            type: "color-picker"
        },
        {
            element_id: "card_background_color",
            label: "Background Color",
            placeholder: "",
            value: "#FFFFFF",
            type: "color-picker"
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
