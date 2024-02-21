import { SelectionJson, DragDropJson, PropertyJson } from "../../utils"
import { BannerSvg } from "./svg"
import { Banner } from "./widget"

export const selectionPanelJson: SelectionJson = {
    element: "banner",
    icon: BannerSvg,
    title: "Banner"
}

export const dragDropJson: DragDropJson = {
    element: "banner",
    component: Banner
}

export const propertyJson: PropertyJson = {
    element: "banner",
    label: "Banner Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "banner"
}
