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
    type?: string
    id?: string
    childType?: string
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
    childType?: string
}

export type PropertyJson = CorePropertyJson & {
    children?: CorePropertyJson[]
}

export const DragDropElementAcceptType: string[] = [ElementNameMap.Text]

export const DragDropElementInputList: string[] = [ElementNameMap.Text]

export const DragDropElementSelectFileList: string[] = [ElementNameMap.Image]

export const DragDropAccecptType: string[] = [
    ElementNameMap.Text,
    ElementNameMap.Image,
    ElementNameMap.RichText,
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
        dropRefMap?: Map<string, Ref<any>>
    }

export type DragDropEditType = DragDropJson &
    LayoutDragDropType & {
        id: string
    }

export type DragDropComponentProps = DragDropEditType & {
    hoverIndex: number
}

export type PropertyEditType = PropertyJson &
    LayoutPropertiesType & {
        id: string
    }

export type PropertiesComponentProps = PropertyEditType & {
    index: number
    isLayout?: boolean
}

export type FocusEditElementType = {
    id?: string
    childType?: string
}

export type SwapLayoutChildType = {
    from: string
    to: string
    parentId: string
}

export enum DragDropButton {
    duplicate = "DUPLICATE",
    delete = "DELETE",
    add = "ADD"
}
