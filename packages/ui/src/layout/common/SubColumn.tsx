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
        subRef,
        childType,
        type,
        parentId,
        isPreview
    } = props

    const { readOnly } = useDisplayPanelContext()
    const { focusEditId, setFocusEditId } = useMultiColumnsContext()

    const [resetColor, setResetColor] = useState<boolean>(false)
    const subColumnElem = document.getElementById(`${id}-${childType}`)

    useEffect(() => {
        if (!resetColor || !subColumnElem) return

        subColumnElem.style.background = ""
    }, [resetColor])

    const updateFocusEditComponent : React.MouseEventHandler<HTMLDivElement> = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation()
        if (readOnly) return
        setFocusEditId({ ...focusEditId, id: parentId, childType })
    }

    useEffect(() => {
        document.addEventListener("mouseout", () => setResetColor(true))
        document.addEventListener("mouseleave", () => setResetColor(true))
        document.addEventListener("dragleave", () => setResetColor(true))

        return () => {
            document.removeEventListener("mouseout", () => setResetColor(true))
            document.removeEventListener("mouseleave", () =>
                setResetColor(true)
            )
            document.removeEventListener("dragleave", () => setResetColor(true))
        }
    }, [])

    return (
        <div
            ref={!readOnly ? subRef : null}
            id={`${id}-${childType}`}
            className={`d-flex w-100 h-100 s-column-grid ${!readOnly ? "s-dragging" : ""} 
                ${!isPreview ? "s-edit-area-border" : "border-none"}`}
            style={{ flex: 1 }}
            onClick={updateFocusEditComponent }
            onMouseEnter={() => setResetColor(false)}
            onMouseOver={() => setResetColor(false)}>
            {/* {!isPreview && <EmptyLayoutGrid />} */}
            {component &&
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
