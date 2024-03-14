import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { WebinarSvg } from "./svg"
import { Webinar } from "./widget"
import { z } from "zod"

export const selectionWebinarJson: SelectionJson = {
    element: "webinar",
    icon: WebinarSvg,
    title: "Webinar"
}

export const dragDropWebinarJson: DragDropJson = {
    element: "webinar",
    component: Webinar
}

export const propertyWebinarJson: PropertyJson = {
    element: "webinar",
    label: "Webinar Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "webinar"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
