import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { ImageSvg } from "./svg"
import { Image } from "./widget"

export const selectionPanelJson: SelectionJson = {
    element: "image",
    icon: ImageSvg,
    title: "Image"
}

export const dragDropJson: DragDropJson = {
    element: "image",
    component: Image
}

export const propertyJson: PropertyJson = {
    element: "image",
    label: "Image Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "image"
}
