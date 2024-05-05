"use client"
import React, { useEffect } from "react"
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"

import { useDisplayPanelContext } from "../../index"
import {
    DragDropJson,
    PropertyJson,
    WidgetProps
} from "../../core/utils/type/index"
import {
    DragDropComponentProps,
    DragDropEditType,
    LayoutProps,
    PropertiesComponentProps,
    PropertyEditType,
    RawElementChildrenType,
    RawElementType,
    ViewPageElementChildType,
    ViewPageElementType,
    useParsePageContext,
    DragDropAccecptElementType
} from "../../utils/index"
import { deepParseJson } from "deep-parse-json"

export const useParsePageJson = (pageJson: string) => {
    const { elementdragDropList, layoutDragDropList, setPageElementList } =
        useParsePageContext()

    console.log("pageJson default", pageJson)

    useEffect(() => {
        const viewList: ViewPageElementType[] = []

        const rawJson = _.cloneDeep(deepParseJson(pageJson))

        if (!_.isArray(rawJson)) return

        rawJson?.map((element: RawElementType) => {
            const childDataList: ViewPageElementChildType[] = []

            if (element?.children) {
                element?.children?.map((child: RawElementChildrenType) => {
                    //@ts-ignore
                    const childComponent: React.FC<any> = _.cloneDeep({
                        ...(elementdragDropList?.get(
                            child?.element
                        ) as DragDropJson)
                    })?.component

                    childDataList.push({
                        ...child,
                        component: childComponent
                    })
                })
            }

            //@ts-ignore
            const elemComponent: React.FC<any> = {
                ...((elementdragDropList?.get(
                    element?.element
                ) as DragDropJson) ??
                    (layoutDragDropList?.get(element?.element) as DragDropJson))
            }?.component

            // @ts-ignore
            viewList.push({
                ...element,
                component: elemComponent,
                elements: childDataList,
                selfData: { children: childDataList }
            })
        })

        console.log(`viewList: `, viewList)
        console.log("pppv 2.05")
        setPageElementList(viewList)
    }, [pageJson])

    return
}
