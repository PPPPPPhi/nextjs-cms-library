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

import { withSubColumn } from "../hoc/SubColumnHOC"

type GeneralColumnProps = DragDropComponentProps & {
    children: (props: any) => React.ReactNode
    selfData: any
    // dropElement: Ref<any> | ConnectDropTarget
    // dropRefMap: Map<string, Ref<any>> | null
    isPreview: boolean
    subRef: React.Ref<any>
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
        type
    } = props

    const [resetColor, setResetColor] = useState<boolean>(false)
    const subColumnElem = document.getElementById(`${id}-${childType}`)

    useEffect(() => {
        // console.log(`[layout] resetColor`, id, resetColor)
        if (!resetColor) return

        if (!subColumnElem) return

        subColumnElem.style.background = ""
    }, [resetColor])

    return (
        <div
            ref={subRef}
            id={`${id}-${childType}`}
            className={`s-column-grid ${!isPreview ? "s-edit-area-border" : ""}`}
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
