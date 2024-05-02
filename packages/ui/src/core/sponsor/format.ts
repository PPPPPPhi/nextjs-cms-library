import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { SponsorSvg } from "./svg"
import { Sponsor } from "./widget"
import { z } from "zod"

export const selectionSponsorJson: SelectionJson = {
    element: "sponsor",
    icon: SponsorSvg,
    title: "sponsor"
}

export const dragDropSponsorJson: DragDropJson = {
    element: "sponsor",
    component: Sponsor
}

export const propertySponsorJson: PropertyJson = {
    element: "sponsor",
    type: "sponsor",
    properties: [
        {
            element_id: "sponsor_title",
            label: "Title",
            placeholder: "Input here ...",
            value: "Sponsor Title",
            type: "text"
        },
        {
            element_id: "sponsor_image_list",
            label: "Image List",
            placeholder: "Input here ...",
            value: [],
            type: "image-list"
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
