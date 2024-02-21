import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { ListSvg } from "./svg"
import { List } from "./widget"

export const selectionPanelJson: SelectionJson = {
    element: "list",
    icon: ListSvg,
    title: "List"
}

export const dragDropJson: DragDropJson = {
    element: "list",
    component: List
}

export const propertyJson: PropertyJson = {
    element: "list",
    label: "List Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "list"
}
