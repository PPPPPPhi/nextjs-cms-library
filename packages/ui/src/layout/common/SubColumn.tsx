import React from "react"
import _ from "lodash"


import {
    DragDropJson,
    SelectionJson,
    DragDropAccecptType,
    LayoutNameMap,
    DragDropComponentProps,
    EmptyLayoutGrid,
    useDisplayPanelContext
} from "@nextjs-cms-library/ui/index"

import { withSubColumn } from "../hoc/index"
import { AdminTableActionWarnButton } from "@nextjs-cms-library/admin-components/index"

type GeneralColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    selfData: any
    // dropElement: Ref<any> | ConnectDropTarget
    // dropRefMap: Map<string, Ref<any>> | null
    isPreview: boolean
    subRef: React.Ref<any>
    parentId: string
    isFocusing: boolean
    setFocusEditId?: (v: { id: string }) => void
    site: string
}

export const GeneralColumn: React.FC<GeneralColumnProps> = (
    props: GeneralColumnProps
) => {
    const { id, component, elements, isPreview, isFocusing, site } = props

    return (
        <div
            className={`d-flex align-items-center justify-content-center w-100 h-100 overflow-hidden ${!isPreview ? "s-edit-area-border" : "border-none"}`}
            style={{
                minHeight: 150,
                borderRadius: 15,
                borderColor: isFocusing ? "navy" : "#ABCFFF"
            }}>
            {component &&
                component({
                    ...props,
                    elements: elements,
                    id: id,
                    isPreview,
                    site
                })}
            {!component && (
                <EmptyLayoutGrid
                    {...props}
                    elements={elements}
                    id={id}
                    isPreview={isPreview}
                    site
                />
            )}
        </div>
    )
}

export const ElementorSubColumn: React.FC<any> = withSubColumn(GeneralColumn)
export const SubColumn: React.FC<any> = GeneralColumn
