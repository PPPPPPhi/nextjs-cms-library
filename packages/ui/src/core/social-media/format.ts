import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { SocialMediaSvg } from "./svg"
import { SocialMedia } from "./widget"
import { z } from "zod"

export const selectionSocialMediaJson: SelectionJson = {
    element: "social-media",
    icon: SocialMediaSvg,
    title: "SocialMedia"
}

export const dragDropSocialMediaJson: DragDropJson = {
    element: "social-media",
    component: SocialMedia
}

export const propertySocialMediaJson: PropertyJson = {
    element: "social-media",
    label: "SocialMedia Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "social-media"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
