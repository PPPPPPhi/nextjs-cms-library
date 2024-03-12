import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { ListSvg } from "./svg"
import { List } from "./widget"

export const selectionListJson: SelectionJson = {
    element: "list",
    icon: ListSvg,
    title: "List"
}

export const dragDropListJson: DragDropJson = {
    element: "list",
    component: List
}

export const propertyListJson: PropertyJson = {
    element: "list",
    label: "List Label",
    placeholder: "Input here ...",
    value: "",
    type: "list"
}
