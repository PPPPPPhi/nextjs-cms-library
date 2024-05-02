import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { SloganSvg } from "./svg"
import { Slogan } from "./widget"

export const selectionSloganJson: SelectionJson = {
    element: "slogan",
    icon: SloganSvg,
    title: "Slogan"
}

export const dragDropSloganJson: DragDropJson = {
    element: "slogan",
    component: Slogan
}

export const propertSloganJson: PropertyJson = {
    element: "slogan",
    type: "slogan",
    properties: [
        {
            element_id: "slogan_title",
            label: "Title",
            placeholder: "Input here ...",
            value: "Slogan Title",
            type: "editor"
        },
        {
            element_id: "slogan_description",
            label: "Description",
            placeholder: "Input here ...",
            value: "Description",
            type: "text"
        }
    ]
}
