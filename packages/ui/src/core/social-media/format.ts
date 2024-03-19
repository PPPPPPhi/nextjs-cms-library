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
    type: "social-media",
    properties: [
        {
            label: "Facebook url",
            placeholder: "Input your facebook url here ...",
            value: "facebookUrl",
            type: "text"
        },
        {
            label: "Instragram url",
            placeholder: "Input your Instragram url here ...",
            value: "instragramUrl",
            type: "text"
        },
        {
            label: "X url",
            placeholder: "Input your X profile here ...",
            value: "xUrl",
            type: "text"
        },
        {
            label: "Whatsapp url",
            placeholder: "Input your Whatsapp contact here ...",
            value: "whatsappUrl",
            type: "text"
        },
        {
            label: "YouTube url",
            placeholder: "Input your YouTube link here ...",
            value: "youtubeUrl",
            type: "text"
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
