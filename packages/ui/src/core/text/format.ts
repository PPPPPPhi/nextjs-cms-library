import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { TextSvg } from "./svg"
import { Text } from "./widget"

export const selectionPanelJson: SelectionJson = {
    element: "text",
    icon: TextSvg,
    title: "Text"
}

export const dragDropJson: DragDropJson = {
    element: "text",
    component: Text
}

export const propertyJson: PropertyJson = {
    element: "text",
    label: "Text Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "text"
}
