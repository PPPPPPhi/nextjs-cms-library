import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { TestimonialSVG } from "./svg"
import { Testimonial } from "./widget"

export const selectionTestimonialJson: SelectionJson = {
    element: "testimonial-slider",
    icon: TestimonialSVG,
    title: "Testimonial"
}

export const dragDropTestimonialJson: DragDropJson = {
    element: "testimonial-slider",
    component: Testimonial
}

export const propertTestimonialJson: PropertyJson = {
    element: "testimonial-slider",
    type: "testimonial-slider",
    properties: [
        {
            element_id: "testimonial_slider_title",
            label: "Testimonial Card",
            placeholder: "Input here ...",
            value: [],
            type: "testimonial-slidar"
        }
    ]
}
