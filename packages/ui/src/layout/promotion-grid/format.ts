import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { PromotionGrid } from "./layout"
import { PromotionGridSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "promotion-grid",
    icon: PromotionGridSvg,
    title: "Promotion Grid"
}

export const PromotionGridChildType = {
    firstColumn: "promition-grid-first",
    secondColumnTop: "promition-grid-second-top",
    secondColumnBottom: "promition-grid-second-bottom",
    thirdColumn: "promition-grid-forth"
}

export const dragDropJson: DragDropJson = {
    element: "promotion-grid",
    component: PromotionGrid,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: PromotionGridChildType.firstColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: PromotionGridChildType.secondColumnTop
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: PromotionGridChildType.secondColumnBottom
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: PromotionGridChildType.thirdColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "promotion-grid",
    label: "Promotion Grid",
    placeholder: "Input here ...",
    value: "Morning World promotion-grid",
    type: "promotion-grid",
    properties: [
        {
            element_id: "promotion_grid_bg_color",
            label: "Background Color",
            placeholder: "",
            value: "",
            type: "color-picker"
        }
    ],
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: PromotionGridChildType.firstColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: PromotionGridChildType.secondColumnTop
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: PromotionGridChildType.secondColumnBottom
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: PromotionGridChildType.thirdColumn
        }
    ]
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string(),
    children: z.array(
        z.object({
            element: z.string(),
            label: z.string(),
            placeholder: z.string(),
            value: z.string(),
            type: z.string()
        })
    )
})
