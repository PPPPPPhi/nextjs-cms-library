export type SvgProps = {
    classname: string
}

export type SelectionJson = {
    element: string
    icon: React.FC<SvgProps>
    title: string
}

export type DragDropJson = {
    element: string
    component: React.FC<any>
}

export type WidgetProps = {
    label: string
    value: string
    placeholder: string
}

export type CorePropertyJson = WidgetProps & {
    element: string
    type: string
}

export type PropertyJson = CorePropertyJson & {
    children?: CorePropertyJson[]
}
