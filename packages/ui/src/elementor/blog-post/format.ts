import { WidgetType } from "../../utils"

export const selectionPanelJson: WidgetType.SelectionJson = {
    element: "blog-post",
    icon: "<div></div>",
    title: "Blog Post"
}

export const dragDropJson: WidgetType.DragDropJson = {
    element: "blog-post",
    component: "<div></div>"
}

export const propertyJson: WidgetType.PropertyJson = {
    element: "blog-post",
    label: "Blog Post Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "blog-post",
    children: [
        {
            element: "text",
            label: "Blog Post Title",
            placeholder: "Input here ...",
            value: "Daily News Express",
            type: "text"
        },
        {
            element: "text",
            label: "Blog Post Content",
            placeholder: "Input here ...",
            value: "Daily News Express",
            type: "text"
        },
        {
            element: "image",
            label: "Blog Post Image",
            placeholder: "Input here ...",
            value: "/image/url",
            type: "image"
        }
    ]
}
