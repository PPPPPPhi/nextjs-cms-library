import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { SVGNavCardSVG } from "./svg"
import { SVGNavCard } from "./widget"

export const selectionSVGNavCardJson: SelectionJson = {
    element: "svg-nav-card",
    icon: SVGNavCardSVG,
    title: "SVG Navigation Card"
}

export const dragDropSVGNavCardJson: DragDropJson = {
    element: "svg-nav-card",
    component: SVGNavCard
}

export const propertSVGNavCardJson: PropertyJson = {
    element: "svg-nav-card",
    type: "svg-nav-card",
    properties: [
        {
            element_id: "svg_nav_card_title",
            label: "Title",
            placeholder: "Input here ...",
            value: "SVG Nav Card Title",
            type: "text"
        },
        {
            element_id: "svg_nav_card_description",
            label: "Description",
            placeholder: "Input here ...",
            value: "Description",
            type: "text"
        },
        {
            element_id: "svg_nav_card_icon",
            label: "SVG Icon",
            value: "FaRegCirclePlay",
            type: "svg-select"
        },
        {
            element_id: "svg_nav_card_destination",
            label: "Destination",
            placeholder: "Input here ...",
            value: "",
            type: "text"
        }
    ]
}
