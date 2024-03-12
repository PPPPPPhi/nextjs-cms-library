import {
    DragDropJson,
    PropertyJson,
    LayoutDragDropType,
    LayoutPropertiesType,
    PropertiesComponentProps
} from "../type/index"

export const DragDropItemType = {
    element: "element",
    layout: "layout",
    component: "component"
}

export type EditComponentType = DragDropJson &
    PropertyJson & {
        id: string
    }

export type EditPropertiesFormRefType = {
    submit: () => Promise<boolean>
    update: () => Promise<boolean>
}

export type ReOrderDropType = {
    before?: number
    beforeId?: string
    after?: number
    afterId?: string
}

export type InsertDropType = {
    type: string
    dropAt: number
}

export type EditElementInfoTye = {
    id: string
    index: number
    values?: PropertiesComponentProps
}

export enum UpdateEditElementAction {
    UPDATE = "update",
    DUPLICATE = "duplicate",
    DELETE = "delete"
}

export type UpdateEditElementType = {
    action: string
    id: string
    index: number
    values?: PropertiesComponentProps
}

export type DisplayPanelPageCallback = (
    pageData: PropertiesComponentProps[]
) => Promise<void>

export type DefaultPropertiesDataType = {
    data?: PropertiesComponentProps
}
