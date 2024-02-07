export type SelectionJson = {
    element: string
    icon: React.FC<{}> | string
    title: string
}

export type DragDropJson = {
    element: string
    component: React.FC<{}> | string
}

export type CorePropertyJson = {
    element: string
    label: string
    value: string
    placeholder: string
    type: string
}

export type PropertyJson = CorePropertyJson & {
    children?: CorePropertyJson[]
}
