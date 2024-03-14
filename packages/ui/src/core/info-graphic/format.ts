import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { InfoGraphicSvg } from "./svg"
import { InfoGraphic } from "./widget"
import { z } from "zod"

export const selectionInfoGraphicJson: SelectionJson = {
    element: "info-graphic",
    icon: InfoGraphicSvg,
    title: "InfoGraphic"
}

export const dragDropInfoGraphicJson: DragDropJson = {
    element: "info-graphic",
    component: InfoGraphic
}

export const propertyInfoGraphicJson: PropertyJson = {
    element: "info-graphic",
    label: "InfoGraphic Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "info-graphic"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
