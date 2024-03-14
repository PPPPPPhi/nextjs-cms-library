import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { HTMLSvg } from "./svg"
import { HTML } from "./widget"
import { z } from "zod"

export const selectionHTMLJson: SelectionJson = {
    element: "html",
    icon: HTMLSvg,
    title: "HTML"
}

export const dragDropHTMLJson: DragDropJson = {
    element: "html",
    component: HTML
}

export const propertyHTMLJson: PropertyJson = {
    element: "html",
    label: "HTML Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "html"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
