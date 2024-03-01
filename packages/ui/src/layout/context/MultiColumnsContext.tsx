"use client"
import React, {
    createContext,
    FC,
    useContext,
    useState,
    useEffect,
    useMemo,
    useRef,
    Dispatch,
    SetStateAction
} from "react"
import _ from "lodash"
import {
    DragDropJson,
    LayoutNameMap,
    PropertiesComponentProps,
    FocusEditElementType,
    SwapLayoutChildType
} from "../../utils"
import { TwoColumn } from "../two-column-grid/layout"
import { ThreeColumn } from "../three-column-grid/layout"

const { DndProvider } = require("react-dnd")
const { HTML5Backend } = require("react-dnd-html5-backend")

const contextDefaultValues: MultiColumnsContextProviderType = {
    isPreview: false,
    selfData: null,
    dragDropList: null,
    focusEditId: {},
    setFocusEditId: () => null,
    setDropComponentInLayout: () => null,
    setIsDragging: () => null,
    setIsInsertNested: () => null,
    setSwapLayoutChild: () => null,
    setIsReOrder: () => null
}

export type MultiColumnsContextProviderType = {
    isPreview: boolean
    selfData: PropertiesComponentProps | null
    dragDropList: Map<string, DragDropJson> | null
    focusEditId: FocusEditElementType
    setFocusEditId: Dispatch<SetStateAction<FocusEditElementType>>

    setDropComponentInLayout: Dispatch<SetStateAction<any>>
    setIsDragging: Dispatch<SetStateAction<boolean>>
    setIsInsertNested: Dispatch<SetStateAction<boolean>>
    setSwapLayoutChild: Dispatch<SetStateAction<SwapLayoutChildType>>
    setIsReOrder: Dispatch<SetStateAction<boolean>>
}

export const MultiColumnsContext =
    createContext<MultiColumnsContextProviderType>(contextDefaultValues)

export const MultiColumnsContextProvider: FC<
    MultiColumnsContextProviderType & any
> = (props) => {
    const {
        id,
        component,
        elements,
        element,
        selfData,
        isPreview,
        children,
        ...rest
    } = props ?? {}

    return (
        <DndProvider backend={HTML5Backend}>
            <MultiColumnsContext.Provider
                value={{
                    ...rest
                }}>
                {element == LayoutNameMap.TwoColumn && (
                    <TwoColumn {...props} children={selfData?.children} />
                )}

                {element == LayoutNameMap.ThreeColumn && (
                    <ThreeColumn {...props} children={selfData?.children} />
                )}
            </MultiColumnsContext.Provider>
        </DndProvider>
    )
}
export function useMultiColumnsContext(): MultiColumnsContextProviderType {
    return useContext(MultiColumnsContext)
}
