import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { BannerSvg } from "./svg"
import { Banner } from "./widget"

export const selectionBannerJson: SelectionJson = {
    element: "banner",
    icon: BannerSvg,
    title: "Banner"
}

export const dragDropBannerJson: DragDropJson = {
    element: "banner",
    component: Banner
}

export const propertyBannerJson: PropertyJson = {
    element: "banner",
    type: "banner",
    properties: [
        {
            label: "Title",
            placeholder: "Input here ...",
            value: "Card Title",
            type: "text"
        },
        {
            label: "SubTitle",
            placeholder: "Input here ...",
            value: "Card SubTitle",
            type: "text"
        },
        {
            label: "Text Color",
            placeholder: "",
            value: "#000000",
            type: "colorPicker"
        },
        {
            label: "Alignment",
            value: "start",
            type: "select",
            options: [
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end" }
            ]
        },
        {
            label: "Image",
            placeholder: "Input here ...",
            value: "",
            type: "image"
        }
    ]
}
