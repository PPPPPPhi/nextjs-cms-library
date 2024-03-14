import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { HiddenSvg } from "./svg"
import { Hidden } from "./widget"
import { z } from "zod"

export const selectionHiddenJson: SelectionJson = {
    element: "hidden",
    icon: HiddenSvg,
    title: "Hidden"
}

export const dragDropHiddenJson: DragDropJson = {
    element: "hidden",
    component: Hidden
}

export const propertyHiddenJson: PropertyJson = {
    element: "hidden",
    label: "Hidden Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "hidden"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
