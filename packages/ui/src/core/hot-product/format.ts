import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { HotProductSvg } from "./svg"
import { HotProduct } from "./widget"
import { z } from "zod"

export const selectionHotProductJson: SelectionJson = {
    element: "hot-product",
    icon: HotProductSvg,
    title: "HotProduct"
}

export const dragDropHotProductJson: DragDropJson = {
    element: "hot-product",
    component: HotProduct
}

export const propertyHotProductJson: PropertyJson = {
    element: "hot-product",
    label: "HotProduct Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "hot-product"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
