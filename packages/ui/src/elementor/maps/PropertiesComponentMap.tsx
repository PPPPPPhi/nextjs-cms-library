import { FC, ReactNode } from "react"
import {
    PropertyText,
    PropertyRichText,
    PropertyColorPicker,
    PropertySelector,
    PropertyImageSelector
} from "../../elementor/drag-drop/property-panel/index"

// @ts-ignore
export const propertiesComponentMap: Map<string, FC<any>> = new Map([
    ["text", PropertyText],
    ["editor", PropertyRichText],
    ["color-picker", PropertyColorPicker],
    ["select", PropertySelector],
    ["image", PropertyImageSelector]
])

export const getPropertiesComponent = (type: string) =>
    propertiesComponentMap.get(type) ?? <></>
