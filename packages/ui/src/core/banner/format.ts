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
    label: "Banner Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "banner"
}
