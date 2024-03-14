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
    label: "Sponsor Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "sponsor"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
