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
    label: "Card Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "card"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
