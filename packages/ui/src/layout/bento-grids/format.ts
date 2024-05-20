import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import { EmptyLayoutGrid } from ".."
import { BentoGrid } from "./layout"
import { BentoGridSvg } from "./svg"
import { z } from "zod"

export const selectionPanelJson: SelectionJson = {
    element: "bento-grid",
    icon: BentoGridSvg,
    title: "Bento Grid"
}

export const BentoGridChildType = {
    firstColumn: "bento-grid-first",
    secondColumn: "bento-grid-second",
    thirdColumn: "bento-grid-third",
    fourthColumn: "bento-grid-fourth",
    fifthColumn: "bento-grid-fifth",
    sixthColumn: "bento-grid-sixth",
    seventhColumn: "bento-grid-seventh",
    eightColumn: "bento-grid-eight"
}

export const dragDropJson: DragDropJson = {
    element: "bento-grid",
    component: BentoGrid,
    elements: [
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.firstColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.secondColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.thirdColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.fourthColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.fifthColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.sixthColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.seventhColumn
        },
        {
            element: "",
            component: EmptyLayoutGrid,
            type: "",
            childType: BentoGridChildType.eightColumn
        }
    ]
}

export const propertyJson: PropertyJson = {
    element: "bento-grid",
    label: "Bento Grid",
    placeholder: "Input here ...",
    value: "Morning World bento-grid",
    type: "bento-grid",
    properties: [
        {
            element_id: "bento_bg_color",
            label: "Background Color",
            placeholder: "",
            value: "aliceblue",
            type: "color-picker"
        }
    ],
    children: [
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.firstColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.secondColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.thirdColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.fourthColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.fifthColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.sixthColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.seventhColumn
        },
        {
            element: "",
            label: "",
            placeholder: "",
            value: "",
            type: "",
            childType: BentoGridChildType.eightColumn
        }
    ]
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string(),
    children: z.array(
        z.object({
            element: z.string(),
            label: z.string(),
            placeholder: z.string(),
            value: z.string(),
            type: z.string()
        })
    )
})
