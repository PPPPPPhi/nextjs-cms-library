import { WidgetType } from "@utils/index"

export const selectionPanelJson: WidgetType.SelectionJson = {
    element: "text",
    icon: "<div></div>",
    title: "Text"
}

export const dragDropJson: WidgetType.DragDropJson = {
    element: "text",
    component: "<div></div>"
}

export const propertyJson: WidgetType.PropertyJson = {
    element: "text",
    label: "Text Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "text"
}
