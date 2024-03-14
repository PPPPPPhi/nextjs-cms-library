import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { ContactSvg } from "./svg"
import { Contact } from "./widget"
import { z } from "zod"

export const selectionContactJson: SelectionJson = {
    element: "contact",
    icon: ContactSvg,
    title: "Contact"
}

export const dragDropContactJson: DragDropJson = {
    element: "contact",
    component: Contact
}

export const propertyContactJson: PropertyJson = {
    element: "contact",
    label: "Contact Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "contact"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
