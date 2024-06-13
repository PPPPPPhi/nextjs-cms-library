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
            value: "Banner Title",
            type: "text"
        },
        {
            element_id: "banner_subtitle",
            label: "SubTitle",
            placeholder: "Input here ...",
            value: "Banner SubTitle",
            type: "text"
        },
        {
            element_id: "banner_description",
            label: "Description",
            placeholder: "Input here ...",
            value: "Banner Description",
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
            element_id: "banner_size",
            label: "Banner Size",
            value: "small",
            type: "select",
            options: [
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
                { label: "Full Height", value: "full" }
            ]
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
        },
        {
            element_id: "banner_cta_btn_left",
            label: "CTA Button Left",
            placeholder: "Input here ...",
            //@ts-ignore
            value: { label: "", destination: "" },
            type: "cta-nav-btn"
        },
        {
            element_id: "banner_cta_btn_right",
            label: "CTA Button Right",
            placeholder: "Input here ...",
            //@ts-ignore
            value: { label: "", destination: "" },
            type: "cta-nav-btn"
        }
    ]
}
