import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { ImageSvg } from "./svg"
import { Image } from "./widget"

export const selectionImageJson: SelectionJson = {
    element: "image",
    icon: ImageSvg,
    title: "Image"
}

export const dragDropImageJson: DragDropJson = {
    element: "image",
    component: Image
}

export const propertyImageJson: PropertyJson = {
    element: "image",
    type: "image",
    properties: [
        {
            element_id: "image_label",
            label: "Label",
            placeholder: "Input here ...",
            value: "Image Label",
            type: "text"
        },
        {
            element_id: "image_src",
            label: "Image",
            placeholder: "Input here ...",
            value: "",
            type: "image"
        },
        {
            element_id: "image_alignment",
            label: "Alignment",
            value: "center",
            type: "select",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
                { label: "Top", value: "top" },
                { label: "Bottom", value: "bottom" }
            ]
        },
        {
            element_id: "image_position",
            label: "Position",
            value: "contain",
            type: "select",
            options: [
                { label: "Contain", value: "contain" },
                { label: "Cover", value: "cover" },
                { label: "Fill", value: "fill" }
            ]
        }
    ]
}
