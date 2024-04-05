"use client"
import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "../../core/utils/type/index"
import {
    ElementorOperator,
    LayoutOperator,
    DragDropAccecptType,
    FocusEditElementType
} from "../../utils/index"
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
import { v4 as uuid_v4 } from "uuid"

import {
    DisplayPanelPageCallback,
    DragDropComponentProps,
    EditElementInfoTye,
    InsertDropType,
    PropertiesComponentProps,
    PropertyEditType,
    ReOrderDropType,
    SwapLayoutChildType,
    UpdateEditElementType
} from "../../utils/index"

const contextDefaultValues: DisplayPanelContextProviderType = {
    site: "",
    readOnly: false,
    setModal: () => null,
    setLoading: () => null,
    elementInstance: null,
    dragDropEditAcceptType: [],
    setDragDropEditAcceptType: () => null,
    dragDropEditAcceptElementType: [],
    setDragDropEditAcceptElementType: () => null,
    elementsList: null,
    dragDropList: null,
    dragDropEditList: [],
    setDragDropEditList: () => null,
    dragDropHistoryList: [],
    setDragDropHistoryList: () => null,
    propertiesList: null,
    propertiesEditList: [],
    setPropertiesEditList: () => null,
    propertiesHistoryList: [],
    setPropertiesHistoryList: () => null,
    layoutList: null,
    layoutDragDropList: null,
    layoutPropertiesList: null,
    reorderComponent: () => null,
    reOrderDropInfo: null,
    setReOrderDropInfo: () => null,
    insertDropInfo: null,
    setInsertDropInfo: () => null,
    isDragging: false,
    setIsDragging: () => null,
    isInsert: false,
    setIsInsert: () => null,
    isInsertNested: false,
    setIsInsertNested: () => null,
    isReOrder: false,
    setIsReOrder: () => null,
    swapLayoutChild: null,
    setSwapLayoutChild: () => null,
    focusEditId: {},
    setFocusEditId: () => null,
    deleteElementId: null,
    setDeleteElementId: () => null,
    duplicateElementId: null,
    setDuplicateElementId: () => null,
    dropComponentInLayout: null,
    setDropComponentInLayout: () => null,
    historyCapSize: 10,
    currentHistoryIndex: 0,
    setCurrentHistoryIndex: () => null,
    toggle: false,
    setToggle: () => null,
    updateElementId: null,
    setUpdateElementId: () => null,
    isExpandView: false,
    setExpandView: () => null,
    isMobileView: false,
    setMobileView: () => null,
    isPreview: false,
    setPreview: () => null,
    isOnHoverLayout: false,
    setIsOnHoverLayout: () => null
}

export type DisplayPanelContextProviderType = {
    site: string
    readOnly: boolean
    setModal: Dispatch<SetStateAction<any>>
    setLoading: Dispatch<SetStateAction<boolean>>
    elementInstance: ElementorOperator | null
    // dragDropEditAcceptType: Array<string>
    elementsList: Map<string, SelectionJson> | null
    dragDropList: Map<string, DragDropJson> | null
    dragDropEditList: Array<DragDropComponentProps>
    setDragDropEditList: Dispatch<
        SetStateAction<Array<DragDropComponentProps> | undefined>
    >
    dragDropHistoryList: Array<DragDropComponentProps[]>
    setDragDropHistoryList: Dispatch<
        SetStateAction<Array<DragDropComponentProps[]> | undefined>
    >
    propertiesList: Map<string, PropertyJson> | null
    propertiesEditList: Array<PropertiesComponentProps>
    setPropertiesEditList: Dispatch<
        SetStateAction<Array<PropertiesComponentProps> | undefined>
    >
    propertiesHistoryList: Array<PropertiesComponentProps[]>
    setPropertiesHistoryList: Dispatch<
        SetStateAction<Array<PropertiesComponentProps[]> | undefined>
    >
    layoutList: Map<string, SelectionJson> | null
    layoutDragDropList: Map<string, DragDropJson> | null
    layoutPropertiesList: Map<string, PropertyJson> | null
    reorderComponent: () => null
    reOrderDropInfo: ReOrderDropType | null
    setReOrderDropInfo: Dispatch<SetStateAction<ReOrderDropType | null>>
    swapLayoutChild: SwapLayoutChildType | null
    setSwapLayoutChild: Dispatch<SetStateAction<SwapLayoutChildType | null>>
    insertDropInfo: InsertDropType | null
    setInsertDropInfo: Dispatch<SetStateAction<InsertDropType | null>>
    isDragging: boolean
    setIsDragging: Dispatch<SetStateAction<boolean>>
    isInsert: boolean
    setIsInsert: Dispatch<SetStateAction<boolean>>
    isInsertNested: boolean
    setIsInsertNested: Dispatch<SetStateAction<boolean>>
    isReOrder: boolean
    setIsReOrder: Dispatch<SetStateAction<boolean>>
    focusEditId: FocusEditElementType
    setFocusEditId: Dispatch<SetStateAction<FocusEditElementType>>
    updateElementId: UpdateEditElementType | null
    setUpdateElementId: Dispatch<SetStateAction<UpdateEditElementType | null>>
    deleteElementId: string | null
    setDeleteElementId: Dispatch<SetStateAction<string | null>>
    duplicateElementId: string | null
    setDuplicateElementId: Dispatch<SetStateAction<string | null>>
    dropComponentInLayout: any
    setDropComponentInLayout: Dispatch<SetStateAction<any>>
    historyCapSize: number
    currentHistoryIndex: number
    setCurrentHistoryIndex: Dispatch<SetStateAction<number>>
    toggle: boolean
    setToggle: Dispatch<SetStateAction<boolean>>
    isExpandView: boolean
    setExpandView: Dispatch<SetStateAction<boolean>>
    isMobileView: boolean
    setMobileView: Dispatch<SetStateAction<boolean>>
    isPreview: boolean
    setPreview: Dispatch<SetStateAction<boolean>>
    isHardPreview: boolean
    setIsHardPreview: Dispatch<SetStateAction<boolean>>
    dragDropEditAcceptType: string[]
    setDragDropEditAcceptType: Dispatch<SetStateAction<string[]>>
    dragDropEditAcceptElementType: string[]
    setDragDropEditAcceptElementType: Dispatch<SetStateAction<string[]>>
    submit?: DisplayPanelPageCallback
    isOnHoverLayout: boolean
    setIsOnHoverLayout: Dispatch<SetStateAction<boolean>>
}

export const DisplayPanelContext =
    createContext<DisplayPanelContextProviderType>(contextDefaultValues)

export const DisplayPanelContextProvider: FC<
    DisplayPanelContextProviderType & any
> = (props) => {
    const {
        children,
        historyCapSize = 10,
        readOnly = false,
        submit,
        setModal,
        setLoading,
        isHardView,
        ...rest
    } = props ?? {}

    const { site } = useParams()

    const elementInstance = new ElementorOperator("displayPanel")
    const layoutInstance = new LayoutOperator()

    const [dragDropEditList, setDragDropEditList] = useState<
        Array<DragDropComponentProps>
    >([])

    const [dragDropHistoryList, setDragDropHistoryList] = useState<
        Array<DragDropComponentProps[]>
    >([])

    const [propertiesEditList, setPropertiesEditList] = useState<
        Array<PropertiesComponentProps>
    >([])

    const [propertiesHistoryList, setPropertiesHistoryList] = useState<
        Array<PropertiesComponentProps[]>
    >([])

    const [reOrderDropInfo, setReOrderDropInfo] =
        useState<ReOrderDropType | null>(null)

    const [swapLayoutChild, setSwapLayoutChild] =
        useState<SwapLayoutChildType | null>(null)

    const [insertDropInfo, setInsertDropInfo] = useState<InsertDropType | null>(
        null
    )

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [isInsert, setIsInsert] = useState<boolean>(false)
    const [isReOrder, setIsReOrder] = useState<boolean>(false)
    const [isInsertNested, setIsInsertNested] = useState<boolean>(false)

    const [focusEditId, setFocusEditId] = useState<FocusEditElementType>({})

    const [updateElementId, setUpdateElementId] =
        useState<UpdateEditElementType | null>(null)

    const [deleteElementId, setDeleteElementId] = useState<string | null>(null)
    const [duplicateElementId, setDuplicateElementId] = useState<string | null>(
        null
    )

    const [dropComponentInLayout, setDropComponentInLayout] =
        useState<any>(null)

    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0)
    const [toggle, setToggle] = useState<boolean>(false)
    const [isExpandView, setExpandView] = useState<boolean>(readOnly)
    const [isMobileView, setMobileView] = useState<boolean>(false)
    const [isPreview, setPreview] = useState<boolean>(readOnly)
    const [isHardPreview, setIsHardPreview] = useState<boolean>(isHardView)

    const [dragDropEditAcceptType, setDragDropEditAcceptType] = useState<
        string[]
    >([])
    const [dragDropEditAcceptElementType, setDragDropEditAcceptElementType] =
        useState<string[]>([])

    const [isOnHoverLayout, setIsOnHoverLayout] = useState(false)

    // useEffect(() => {
    //     if (!dragDropHistoryList) {
    //         setDragDropEditAcceptType(["default"])
    //         return
    //     }

    //     // @ts-ignore
    //     const acceptIds: string[] = dragDropHistoryList[
    //         currentHistoryIndex
    //     ].map((item: DragDropComponentProps) => item?.id)

    //     setDragDropEditAcceptType(acceptIds)
    // }, [dragDropHistoryList, currentHistoryIndex])

    const elementsList = elementInstance.getSelectionList()
    const dragDropList = elementInstance.getComponentsList()
    const propertiesList = elementInstance.getPropertiesList()

    const layoutList = layoutInstance.getSelectionList()
    const layoutDragDropList = layoutInstance.getComponentsList()
    const layoutPropertiesList = layoutInstance.getPropertiesList()

    return (
        <DisplayPanelContext.Provider
            value={{
                ...rest,
                site,
                readOnly,
                setModal,
                setLoading,
                elementInstance,
                elementsList,
                dragDropList,
                dragDropEditList,
                setDragDropEditList,
                dragDropHistoryList,
                setDragDropHistoryList,
                propertiesList,
                propertiesEditList,
                setPropertiesEditList,
                propertiesHistoryList,
                setPropertiesHistoryList,
                layoutList,
                layoutDragDropList,
                layoutPropertiesList,
                submit,
                reOrderDropInfo,
                setReOrderDropInfo,
                swapLayoutChild,
                setSwapLayoutChild,
                insertDropInfo,
                setInsertDropInfo,
                isDragging,
                setIsDragging,
                focusEditId,
                setFocusEditId,
                updateElementId,
                setUpdateElementId,
                deleteElementId,
                setDeleteElementId,
                duplicateElementId,
                setDuplicateElementId,
                dropComponentInLayout,
                setDropComponentInLayout,
                historyCapSize,
                currentHistoryIndex,
                setCurrentHistoryIndex,
                toggle,
                setToggle,
                isExpandView,
                setExpandView,
                isMobileView,
                setMobileView,
                isPreview,
                setPreview,
                dragDropEditAcceptType,
                setDragDropEditAcceptType,
                dragDropEditAcceptElementType,
                setDragDropEditAcceptElementType,
                isInsert,
                setIsInsert,
                isInsertNested,
                setIsInsertNested,
                isReOrder,
                setIsReOrder,
                isOnHoverLayout,
                setIsOnHoverLayout,
                isHardPreview,
                setIsHardPreview
            }}>
            {children}
        </DisplayPanelContext.Provider>
    )
}
export function useDisplayPanelContext(): DisplayPanelContextProviderType {
    return useContext(DisplayPanelContext)
}
