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
    label: "Image Label",
    placeholder: "Input here ...",
    value: "",
    type: "image"
}
