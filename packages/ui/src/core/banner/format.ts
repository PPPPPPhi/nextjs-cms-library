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
            element_id: "banner_title",
            label: "Title",
            placeholder: "Input here ...",
            value: "Card Title",
            type: "text"
        },
        {
            element_id: "banner_subtitle",
            label: "SubTitle",
            placeholder: "Input here ...",
            value: "Card SubTitle",
            type: "text"
        },
        {
            element_id: "banner_text_color",
            label: "Text Color",
            placeholder: "",
            value: "#000000",
            type: "color-picker"
        },
        {
            element_id: "banner_alignment",
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
            element_id: "banner_image_src",
            label: "Image",
            placeholder: "Input here ...",
            value: "",
            type: "image"
        }
    ]
}
