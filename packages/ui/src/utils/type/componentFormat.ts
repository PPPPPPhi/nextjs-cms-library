import { Ref } from "react"
import { ElementNameMap, LayoutNameMap } from "../NameMap"

export type SvgProps = {
    classname?: string
    width?: number
    height?: number
    color?: string
}

export type SelectionJson = {
    element: string
    icon: React.FC<SvgProps>
    title: string
}

export type CoreDragDropJson = {
    element: string
    component: React.FC<any>
    id?: string
}

export type DragDropJson = CoreDragDropJson & {
    elements?: CoreDragDropJson[]
}

export type WidgetProps = {
    label: string
    value: string
    placeholder: string
}

export type CorePropertyJson = WidgetProps & {
    element: string
    type: string
    id?: string
}

export type PropertyJson = CorePropertyJson & {
    children?: CorePropertyJson[]
}

export const DragDropAccecptType: string[] = [
    ElementNameMap.Text,
    LayoutNameMap.ThreeColumn,
    LayoutNameMap.TwoColumn
]

export type LayoutDragDropType = {
    elements?: DragDropJson[]
}

export type LayoutPropertiesType = {
    children?: PropertyJson[]
}

export type LayoutProps = LayoutDragDropType &
    LayoutPropertiesType & {
        dropRef?: Ref<any>
    }
