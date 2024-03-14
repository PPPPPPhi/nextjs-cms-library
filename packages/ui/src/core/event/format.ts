import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { EventSvg } from "./svg"
import { Event } from "./widget"
import { z } from "zod"

export const selectionEventJson: SelectionJson = {
    element: "event",
    icon: EventSvg,
    title: "Event"
}

export const dragDropEventJson: DragDropJson = {
    element: "event",
    component: Event
}

export const propertyEventJson: PropertyJson = {
    element: "event",
    label: "Event Label",
    placeholder: "Input here ...",
    value: "Morning World",
    type: "event"
}

export const validSchema = z.object({
    element: z.string(),
    label: z.string(),
    placeholder: z.string(),
    value: z.string(),
    type: z.string()
})
