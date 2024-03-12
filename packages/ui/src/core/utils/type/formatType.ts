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
