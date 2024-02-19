import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { ThreeColumn } from "./layout"
import { ThreeColumnSvg } from "./svg"

export const selectionPanelJson: SelectionJson = {
    element: "three-column",
    icon: ThreeColumnSvg,
    title: "Three Column"
}

export const dragDropJson: DragDropJson = {
    element: "three-column",
    component: ThreeColumn,
    elements: []
}

export const propertyJson: PropertyJson = {
    element: "three-column",
    label: "Three Column",
    placeholder: "Input here ...",
    value: "Morning World three-column",
    type: "three-column",
    children: []
}
