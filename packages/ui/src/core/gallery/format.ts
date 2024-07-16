import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { GallerySvg } from "./svg"
import { Gallery } from "./widget"
import { z } from "zod"

export const selectionGalleryJson: SelectionJson = {
    element: "gallery",
    icon: GallerySvg,
    title: "Gallery"
}

export const dragDropGalleryJson: DragDropJson = {
    element: "gallery",
    component: Gallery
}

export const propertyGalleryJson: PropertyJson = {
    element: "gallery",
    label: "Gallery Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "gallery",
    properties: [
        {
            element_id: "gallery_label",
            label: "Label",
            placeholder: "Input here ...",
            value: "Gallery Label",
            type: "text"
        },
        {
            element_id: "gallery_src",
            label: "Gallery",
            placeholder: "Upload Document",
            value: "",
            type: "document"
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
