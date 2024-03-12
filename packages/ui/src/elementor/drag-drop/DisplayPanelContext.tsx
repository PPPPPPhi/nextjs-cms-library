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
    pageJson: [],
    readOnly: false,
    elementInstance: null,
    dragDropEditAcceptType: [],
    setDragDropEditAcceptType: () => null,
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
    setPreview: () => null
}

export type DisplayPanelContextProviderType = {
    pageJson: PropertiesComponentProps[] | null
    readOnly: boolean
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
    deleteElementId: EditElementInfoTye | null
    setDeleteElementId: Dispatch<SetStateAction<EditElementInfoTye | null>>
    duplicateElementId: EditElementInfoTye | null
    setDuplicateElementId: Dispatch<SetStateAction<EditElementInfoTye | null>>
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
    dragDropEditAcceptType: string[]
    setDragDropEditAcceptType: Dispatch<SetStateAction<string[]>>
    submit?: DisplayPanelPageCallback
}

export const DisplayPanelContext =
    createContext<DisplayPanelContextProviderType>(contextDefaultValues)

export const DisplayPanelContextProvider: FC<
    DisplayPanelContextProviderType & any
> = (props) => {
    const {
        children,
        historyCapSize = 10,
        pageJson,
        readOnly = false,
        submit,
        ...rest
    } = props ?? {}

    const elementInstance = new ElementorOperator("displayPanel")
    const layoutInstance = new LayoutOperator()

    const [dragDropEditList, setDragDropEditList] = useState<
        Array<DragDropComponentProps>
    >([])

    const [dragDropHistoryList, setDragDropHistoryList] = useState<
        Array<DragDropComponentProps[]>
    >([[]])

    const [propertiesEditList, setPropertiesEditList] = useState<
        Array<PropertiesComponentProps>
    >([])

    const [propertiesHistoryList, setPropertiesHistoryList] = useState<
        Array<PropertiesComponentProps[]>
    >([[]])

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

    const [deleteElementId, setDeleteElementId] =
        useState<EditElementInfoTye | null>(null)
    const [duplicateElementId, setDuplicateElementId] =
        useState<EditElementInfoTye | null>(null)

    const [dropComponentInLayout, setDropComponentInLayout] =
        useState<any>(null)

    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0)
    const [toggle, setToggle] = useState<boolean>(false)
    const [isExpandView, setExpandView] = useState<boolean>(readOnly)
    const [isMobileView, setMobileView] = useState<boolean>(false)
    const [isPreview, setPreview] = useState<boolean>(readOnly)

    const [dragDropEditAcceptType, setDragDropEditAcceptType] = useState<
        string[]
    >([])

    useEffect(() => {
        if (!dragDropHistoryList) {
            setDragDropEditAcceptType(["default"])
            return
        }

        // @ts-ignore
        const acceptIds: string[] = dragDropHistoryList[
            currentHistoryIndex
        ].map((item: DragDropComponentProps) => item?.id)

        setDragDropEditAcceptType(acceptIds)
    }, [dragDropHistoryList, currentHistoryIndex])

    const elementsList = elementInstance.getSelectionList()
    const dragDropList = elementInstance.getComponentsList()
    const propertiesList = elementInstance.getPropertiesList()

    const layoutList = layoutInstance.getSelectionList()
    const layoutDragDropList = layoutInstance.getComponentsList()
    const layoutPropertiesList = layoutInstance.getPropertiesList()

    useEffect(() => {
        console.log(`** GET PAGE DATA **`, !!pageJson)

        if (!pageJson || _.isEmpty(pageJson) || !_.isArray(pageJson)) return
        console.log(`[pageData] ** GET PAGE DATA ** `, pageJson, dragDropList)

        const pageDataDragDropList: DragDropComponentProps[] = []

        pageJson?.map((element: PropertyEditType, index: number) => {
            const childDataList: DragDropComponentProps[] = []

            if (element?.children) {
                element?.children?.map(
                    (element: PropertyJson, index: number) => {
                        // console.log(`[pageData] get element child`, element)

                        const newChild: DragDropComponentProps = {
                            ...(dragDropList?.get(
                                element?.element
                            ) as DragDropJson),
                            id: element?.id ?? "",
                            hoverIndex: index
                        }

                        // console.log(`[pageData] new child`, newChild)
                        childDataList.push(newChild)
                    }
                )
            }

            const newDragDropComponent: DragDropComponentProps = {
                ...((dragDropList?.get(element?.element) as DragDropJson) ??
                    (layoutDragDropList?.get(
                        element?.element
                    ) as DragDropJson)),
                id: element?.id,
                hoverIndex: index,
                elements: childDataList ?? []
            }

            // console.log(
            //     `[pageData] new child`,
            //     childDataList,
            //     newDragDropComponent
            // )
            pageDataDragDropList.push(newDragDropComponent)
        })

        setDragDropEditList(pageDataDragDropList)
        setPropertiesEditList(pageJson)

        setDragDropHistoryList([pageDataDragDropList])
        setPropertiesHistoryList([pageJson])
        setCurrentHistoryIndex(0)
        setToggle(!toggle)
    }, [pageJson])

    useEffect(() => {
        if (isDragging) return

        // console.log(`[hover] hoverComponent isInsert`, isInsert)
        // console.log(`[hover] hoverComponent isInsertNested`, isInsertNested)

        if (!isInsert) return
        if (isInsertNested) return
        if (!insertDropInfo) return

        console.log(`[hover] trigger INSERT ORDER ??`, insertDropInfo)

        const { type, dropAt } = insertDropInfo

        const currentDrag = _.cloneDeep(
            dragDropHistoryList[currentHistoryIndex]
        )
        const currentProp = _.cloneDeep(
            propertiesHistoryList[currentHistoryIndex]
        )

        const newId = uuid_v4()

        const insertDragDrop = {
            ...((dragDropList?.get(type) as DragDropJson) ??
                (layoutDragDropList?.get(type) as DragDropJson)),
            id: newId,
            hoverIndex: dropAt
        }

        const insertProperty = {
            ...((propertiesList?.get(type) as PropertyJson) ??
                (layoutPropertiesList?.get(type) as PropertyJson)),
            id: newId
            // index: dropAt
        }

        if (!currentDrag || !currentProp) return

        currentDrag?.splice(dropAt, 0, insertDragDrop)
        // @ts-ignore
        currentProp?.splice(dropAt, 0, insertProperty)

        const swapDragElem = _.cloneDeep(currentDrag)
        const swapPropElem = _.cloneDeep(currentProp)

        setDragDropEditList(swapDragElem)
        setPropertiesEditList(swapPropElem)

        setDragDropHistoryList([...dragDropHistoryList, swapDragElem])
        setPropertiesHistoryList([...propertiesHistoryList, swapPropElem])

        if (currentHistoryIndex < historyCapSize - 1) {
            setCurrentHistoryIndex(currentHistoryIndex + 1)
        }

        setToggle(!toggle)
    }, [insertDropInfo, isDragging])

    useEffect(() => {
        if (isDragging) return
        if (!isReOrder) return
        if (!reOrderDropInfo) return

        console.log(`[hover] trigger RE ORDER ??`, reOrderDropInfo)

        const { before, after } = reOrderDropInfo
        const currentDrag = _.cloneDeep(
            dragDropHistoryList[currentHistoryIndex]
        )
        const currentProp = _.cloneDeep(
            propertiesHistoryList[currentHistoryIndex]
        )

        // console.log(`[hover] list before`, currentDrag, currentProp)

        const afterIndex = after as number
        const beforeIndex = before as number
        const listLength = currentDrag?.length

        // console.log(
        //     `[hover] info`,
        //     before,
        //     after,
        //     typeof beforeIndex,
        //     typeof afterIndex,
        //     beforeIndex < afterIndex
        // )

        // console.log(`[hover] list edit drag`, reOrderDropInfo, before, after)
        // console.log(`[hover] edit drag from ${beforeIndex} - drop to ${after}`)

        const swapDropElem = _.cloneDeep(currentDrag?.[afterIndex])
        const swapDragElem = _.cloneDeep(currentDrag?.[beforeIndex])
        const swapPropElem = _.cloneDeep(currentProp?.[beforeIndex])

        // console.log(
        //     `swap dropping element`,
        //     swapDropElem,
        //     swapDragElem,
        //     beforeIndex
        // )
        if (!swapDragElem || !swapPropElem) return

        if (beforeIndex == afterIndex) return

        if (beforeIndex < afterIndex) {
            if (afterIndex + 1 == listLength) {
                currentDrag?.push(swapDragElem)
                currentProp?.push(swapPropElem)
            } else {
                currentDrag?.splice(afterIndex + 1, 0, swapDragElem)
                currentProp?.splice(afterIndex + 1, 0, swapPropElem)
            }
            currentDrag?.splice(beforeIndex, 1)
            currentProp?.splice(beforeIndex, 1)
        }

        if (beforeIndex > afterIndex) {
            currentDrag?.splice(afterIndex, 0, swapDragElem)
            currentProp?.splice(afterIndex, 0, swapPropElem)
            currentDrag?.splice(beforeIndex + 1, 1)
            currentProp?.splice(beforeIndex + 1, 1)
        }

        const swappedList: DragDropComponentProps[] = []
        const swappedPropertiesList = _.cloneDeep(currentProp)

        currentDrag?.map((item, index) => {
            console.log(item?.hoverIndex, index)

            swappedList.push({ ...item, hoverIndex: index })
        })

        if (!swappedList || !swappedPropertiesList) return

        setDragDropEditList(swappedList)
        setPropertiesEditList(swappedPropertiesList)
        setDragDropHistoryList([...dragDropHistoryList, swappedList])
        setPropertiesHistoryList([
            ...propertiesHistoryList,
            swappedPropertiesList
        ])

        if (currentHistoryIndex < historyCapSize - 1) {
            setCurrentHistoryIndex(currentHistoryIndex + 1)
        }

        setToggle(!toggle)
        // console.log(`[hover] list`, swappedList, swappedPropertiesList)
    }, [reOrderDropInfo, isDragging])

    useEffect(() => {
        if (!propertiesEditList) return
        if (!focusEditId) setFocusEditId({ id: propertiesEditList[0]?.id })
    }, [propertiesEditList])

    return (
        <DisplayPanelContext.Provider
            value={{
                ...rest,
                readOnly,
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
                isInsert,
                setIsInsert,
                isInsertNested,
                setIsInsertNested,
                isReOrder,
                setIsReOrder
            }}>
            {children}
        </DisplayPanelContext.Provider>
    )
}
export function useDisplayPanelContext(): DisplayPanelContextProviderType {
    return useContext(DisplayPanelContext)
}
