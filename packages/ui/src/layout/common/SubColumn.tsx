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
    EmptyLayoutGrid
} from "@nextjs-cms-library/ui/index"

import { withSubColumn } from "../hoc/index"
import { useMultiColumnsContext } from "../context/index"

type GeneralColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    selfData: any
    // dropElement: Ref<any> | ConnectDropTarget
    // dropRefMap: Map<string, Ref<any>> | null
    isPreview: boolean
    subRef: React.Ref<any>
    parentId: string
}

export const GeneralColumn: React.FC<GeneralColumnProps> = (
    props: GeneralColumnProps
) => {
    const {
        id,
        component,
        elements,
        element,
        isPreview,
        subRef,
        childType,
        type,
        parentId
    } = props

    const { focusEditId, setFocusEditId } = useMultiColumnsContext()

    const [resetColor, setResetColor] = useState<boolean>(false)
    const subColumnElem = document.getElementById(`${id}-${childType}`)

    useEffect(() => {
        if (!resetColor || !subColumnElem) return

        subColumnElem.style.background = ""
    }, [resetColor])

    const updateFocusEditComponent = () => {
        setFocusEditId({ ...focusEditId, id: parentId, childType })
    }

    return (
        <div
            ref={subRef}
            id={`${id}-${childType}`}
            className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
            onClick={() => updateFocusEditComponent()}
            onMouseEnter={() => setResetColor(false)}
            onMouseOver={() => setResetColor(false)}
            onMouseOut={() => setResetColor(true)}
            onDragLeave={() => setResetColor(true)}>
            {!type && !isPreview && <EmptyLayoutGrid />}
            {type &&
                component &&
                component({
                    ...props,
                    elements: elements,
                    id: id,
                    isPreview: isPreview
                })}
        </div>
    )
}

export const SubColumn: React.FC<any> = withSubColumn(GeneralColumn)
