import React, {
    useCallback,
    useMemo,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react"

import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"

import {
    PropertiesComponentProps,
    PropertyEditType
} from "../../../utils/index"
import { useDisplayPanelContext } from "../DisplayPanelContext"

import { PropertiesComponent } from "./PropertiesComponent"
import { unknown } from "zod"
import { useUpdateEditList } from "../../../utils/index"
import { SaveSvg } from "../drag-drop-panel/DragDropButtons"

type PropertiesPanelAreaProps = {}

export const PropertiesPanelArea: React.FC<PropertiesPanelAreaProps> = (
    props: PropertiesPanelAreaProps
) => {
    const {
        propertiesEditList,
        propertiesHistoryList,
        currentHistoryIndex,
        toggle,
        isExpandView,
        submit,
        propertiesList,
        focusEditId
    } = useDisplayPanelContext()

    useUpdateEditList()

    const editList = useMemo(() => {
        const list = propertiesEditList
        // console.log(
        //     `after update ***** current propertyedit`,
        //     // list,
        //     currentHistoryIndex,
        //     propertiesHistoryList
        // )

        if (!list) return <></>

        return list.map((component: PropertyEditType, index: number) => {
            const defaultData = propertiesEditList.find(
                (i: PropertiesComponentProps) => i?.id == component?.id
            )

            return (
                <div key={`${component?.id}-properties`}>
                    <PropertiesComponent
                        {...component}
                        index={index}
                        data={defaultData}
                    />
                </div>
            )
        })
    }, [propertiesEditList, currentHistoryIndex, toggle])

    return (
        <div
            id="page-edit-properties-area"
            className="shadow fixed s-section-primary rounded-2 p-3"
            style={{
                width: 300,
                minWidth: 0,
                right: 20,
                display: !isExpandView && focusEditId ? "block" : "none",
                top: 100,
                height: "80%"
            }}>
            <div className=" dark:text-white p-2 d-flex flex-column h-100">
                <span className="text-font-bold text-level-subtitle">
                    Edit Properties
                </span>
                <div className="overflow-auto" style={{ flex: 1 }}>
                    {editList}
                </div>
            </div>
        </div>
    )
}

PropertiesPanelArea.displayName = "PropertiesPanelArea"
