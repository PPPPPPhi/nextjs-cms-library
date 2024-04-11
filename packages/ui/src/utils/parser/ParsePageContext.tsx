"use client"

import {
    ElementorOperator,
    LayoutOperator,
    DragDropAccecptType,
    FocusEditElementType,
    useParsePageJson
} from "../index"
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
import { useParams } from "next/navigation"
import { deepParseJson } from "deep-parse-json"
import { v4 as uuid_v4 } from "uuid"

import { DragDropJson, ViewPageElementType } from "../type/componentFormat"

const contextDefaultValues: ParsePageContextProviderType = {
    site: "",
    pageJson: "",
    readOnly: false,
    pageElementList: [],
    setPageElementList: () => null,
    elementdragDropList: null,
    layoutDragDropList: null
}

export type ParsePageContextProviderType = {
    site: string
    pageJson: string | null
    readOnly: boolean
    pageElementList: ViewPageElementType[]
    setPageElementList: Dispatch<
        SetStateAction<ViewPageElementType[] | undefined>
    >
    elementdragDropList: Map<string, DragDropJson> | null
    layoutDragDropList: Map<string, DragDropJson> | null
}

export const ParsePageContext =
    createContext<ParsePageContextProviderType>(contextDefaultValues)

export const ParsePageContextProvider: FC<
    ParsePageContextProviderType & any
> = (props) => {
    const {
        children,
        historyCapSize = 10,
        pageJson,
        readOnly = false,
        submit,
        setModal,
        setLoading,
        ...rest
    } = props ?? {}

    const { site } = useParams()

    const elementInstance = new ElementorOperator("displayPanel")
    const layoutInstance = new LayoutOperator()

    const elementdragDropList = elementInstance.getComponentsList()
    const layoutDragDropList = layoutInstance.getComponentsList()

    const [pageElementList, setPageElementList] = useState<
        ViewPageElementType[]
    >([])

    return (
        <ParsePageContext.Provider
            value={{
                ...rest,
                site,
                readOnly,
                setModal,
                setLoading,
                pageJson,
                elementInstance,
                elementdragDropList,
                layoutDragDropList,
                pageElementList,
                setPageElementList
            }}>
            {children}
        </ParsePageContext.Provider>
    )
}
export function useParsePageContext(): ParsePageContextProviderType {
    return useContext(ParsePageContext)
}
