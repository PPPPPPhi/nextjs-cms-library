import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { TrophySvg } from "./svg"
import { Trophy } from "./widget"
import { z } from "zod"

export const selectionTrophyJson: SelectionJson = {
    element: "trophy",
    icon: TrophySvg,
    title: "Trophy"
}

export const dragDropTrophyJson: DragDropJson = {
    element: "trophy",
    component: Trophy
}

export const propertyTrophyJson: PropertyJson = {
    element: "trophy",
    label: "Trophy Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "trophy"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
