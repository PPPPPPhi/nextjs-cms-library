import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { PhotoGallerySvg } from "./svg"
import { PhotoGallery } from "./widget"
import { z } from "zod"

export const selectionPhotoGalleryJson: SelectionJson = {
    element: "photo-gallery",
    icon: PhotoGallerySvg,
    title: "PhotoGallery"
}

export const dragDropPhotoGalleryJson: DragDropJson = {
    element: "photo-gallery",
    component: PhotoGallery
}

export const propertyPhotoGalleryJson: PropertyJson = {
    element: "photo-gallery",
    label: "PhotoGallery Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "photo-gallery"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
