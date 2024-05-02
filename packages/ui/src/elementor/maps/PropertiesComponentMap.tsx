import { FC, ReactNode } from "react"
import {
    PropertyText,
    PropertyRichText,
    PropertyColorPicker,
    PropertySelector,
    PropertyImageSelector,
    PropertySVGSelector,
    PropertyImageListSelector,
    PropertyTestimonial,
    PropertyCtaNavButton
} from "../../elementor/drag-drop/property-panel/index"

// @ts-ignore
export const propertiesComponentMap: Map<string, FC<any>> = new Map([
    ["text", PropertyText],
    ["editor", PropertyRichText],
    ["color-picker", PropertyColorPicker],
    ["select", PropertySelector],
    ["image", PropertyImageSelector],
    ["svg-select", PropertySVGSelector],
    ["image-list", PropertyImageListSelector],
    ["testimonial-slidar", PropertyTestimonial],
    ["cta-nav-btn", PropertyCtaNavButton]
])

export const getPropertiesComponent = (type: string) =>
    propertiesComponentMap.get(type) ?? <></>
