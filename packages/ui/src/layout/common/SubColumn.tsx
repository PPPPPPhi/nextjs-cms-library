import React, {
    useCallback,
    useRef,
    useMemo,
    useState,
    useEffect,
    Ref,
    Children
} from "react"
import _, { after, before } from "lodash"

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
import { useMultiColumnsContext } from "../context/index"
import useViewHook from "../../elementor/drag-drop/hooks/useViewHook"

type GeneralColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    selfData: any
    // dropElement: Ref<any> | ConnectDropTarget
    // dropRefMap: Map<string, Ref<any>> | null
    isPreview: boolean
    subRef: React.Ref<any>
    parentId: string
    setFocusEditId?: (v: { id: string }) => void
}

export const GeneralColumn: React.FC<GeneralColumnProps> = (
    props: GeneralColumnProps
) => {
    const { id, component, elements, isPreview } = props
    return (
        <>
            {component &&
                component({
                    ...props,
                    elements: elements,
                    id: id,
                    isPreview
                })}
        </>
    )
}

export const ElementorSubColumn: React.FC<any> = withSubColumn(GeneralColumn)
export const SubColumn: React.FC<any> = GeneralColumn
