import React, { useMemo, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { CorePropertyJson } from "@nextjs-cms-library/ui/index"
import {
    DefaultPropertiesDataType,
    PropertiesComponentProps
} from "../../../utils/index"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesChildInput } from "./PropertiesChildInput"
import DragDropIcon from "./dragdrop.png"

type PropertiesChildEmptyProps = {}

const PropertiesChildEmpty: React.FC<PropertiesChildEmptyProps> = ({}) => {
    return (
        <div className="flex flex-col justify-center text-center">
            <span className="my-3 text-level-body text-font-bold s-text-color-alpha">
                Select an element to edit
            </span>
            <div className="my-3 flex flex-row justify-center">
                <img className="w-24 h-24" src={DragDropIcon.src} />
            </div>
            <span className="my-3 text-level-remark text-font-medium s-text-color-alpha">
                None selected
            </span>
        </div>
    )
}

export const PropertiesComponent: React.FC<
    PropertiesComponentProps &
        DefaultPropertiesDataType & { isWideMode: boolean }
> = (props: PropertiesComponentProps & DefaultPropertiesDataType) => {
    const { id, element, type, children, data, properties } = props

    const {
        focusEditId,
        propertiesEditList,
        dragDropEditList,
        setPropertiesEditList,
        setDragDropEditList
    } = useDisplayPanelContext()
    const { control, getValues, setValue, reset } = useForm({
        defaultValues: data
    })

    const DEFAULT_PROPERTY = {
        propertiesList: [],
        propertyId: "",
        propertyType: ""
    }

    const [i, setI] = useState(false)

    const {
        propertiesList,
        propertyId,
        propertyType
    }: {
        propertiesList: CorePropertyJson[]
        propertyId: string
        propertyType: string
    } = useMemo(() => {
        if (!focusEditId.id) return DEFAULT_PROPERTY
        setI(false)

        const focusEditRef = focusEditId.id
        const eItem = propertiesEditList.find((k) => k.id === focusEditRef)

        if (eItem?.properties && eItem?.properties.length) {
            return {
                propertiesList: eItem.properties,
                propertyId: eItem.id,
                propertyType: eItem.type
            }
        } else if (eItem?.children) {
            const childEItem = eItem.children.find((k) => k.id === focusEditRef)
            // if (childEItem?.properties && childEItem?.properties.length)
            //     return {
            //         propertiesList: childEItem.properties,
            //         propertyId: childEItem.id,
            //         propertyType: childEItem.type
            //     }
            // else return DEFAULT_PROPERTY
            return DEFAULT_PROPERTY
        } else if (!eItem) {
            const pItem = propertiesEditList.find(
                (k) => k.id === focusEditId.parentId
            )
            const cItem = pItem?.children?.find((k) => k.id === focusEditRef)
            if (cItem)
                return {
                    propertiesList: cItem.properties,
                    propertyId: cItem.id,
                    propertyType: cItem.type
                }
            else return DEFAULT_PROPERTY
        } else return DEFAULT_PROPERTY
    }, [focusEditId, propertiesEditList, dragDropEditList])

    useEffect(() => {
        if (propertiesList.length) {
            let defaultV = {}
            propertiesList.forEach((k: any) => {
                defaultV = { ...defaultV, [k.element_id]: k.value }
            })
            //@ts-ignore
            setValue(propertyId, defaultV)
            setI(true)
        }
    }, [propertiesList, propertyId])

    const propertiesRef = useRef<any>()
    const dragDropListRef = useRef<any>()
    useEffect(() => {
        propertiesRef.current = propertiesEditList
    }, [propertiesEditList])
    useEffect(() => {
        dragDropListRef.current = dragDropEditList
    }, [dragDropEditList])

    const updateProperties = () => {
        const values = getValues()

        const focusEditRef = focusEditId.id
        const focusEditRefParent = focusEditId.parentId

        if (!focusEditRef) return

        // @ts-ignore
        const updateValue = values[focusEditRef]

        const newPropertiesList = _.cloneDeep(propertiesRef.current)

        if (!focusEditRefParent) {
            const currentItem = _.cloneDeep(
                newPropertiesList.find((k) => k.id === focusEditRef)
            )

            const currentItemIdx = newPropertiesList.findIndex(
                (l) => l.id === focusEditRef
            )

            const updatedItem = {
                ...currentItem,
                properties: currentItem?.properties.map((l) => {
                    return {
                        ...l,
                        value: updateValue[l.element_id]
                    }
                })
            }

            newPropertiesList[currentItemIdx] = updatedItem

            console.log("puuuuu 6", updatedItem)

            setPropertiesEditList(_.cloneDeep(newPropertiesList))
        } else {
            const currentItem = _.cloneDeep(
                newPropertiesList.find((k) => k.id === focusEditId.parentId)
            )
            const currentItemIdx = newPropertiesList.findIndex(
                (l) => l.id === focusEditId.parentId
            )

            console.log("inside parent currentItem", currentItem)
            console.log("inside parent currentItemIdx", currentItemIdx)

            const updatedItem = {
                ...currentItem,
                children: currentItem?.children.map(
                    (child: any, index: number) => {
                        if (child.id !== focusEditRef) return { ...child }
                        else
                            return {
                                ...child,
                                properties: child?.properties?.map((k) => {
                                    return {
                                        ...k,
                                        value: values[focusEditRef][
                                            k.element_id
                                        ]
                                    }
                                })
                            }
                    }
                )
            }

            newPropertiesList[currentItemIdx] = updatedItem

            console.log("puuuuu 7", updatedItem)

            setPropertiesEditList(_.cloneDeep(newPropertiesList))
            setDragDropEditList(_.cloneDeep(dragDropListRef.current))
        }
    }

    return (
        <div className="h-100 w-100 d-flex flex-column">
            {/* <span className="s-text-color-alpha text-level-body text-font-light">{`Widget Type: ${element}`}</span> */}
            <span
                className="s-text-color-alpha text-level-body text-font-bold"
                style={{
                    textTransform: "capitalize"
                }}>
                {propertyType}
            </span>
            <div
                className="d-flex flex-column overflow-y-auto py-2"
                style={{ flex: 1 }}>
                {i && propertiesList?.length === 0 && <PropertiesChildEmpty />}
                {i &&
                    propertiesList?.map((l) => {
                        return (
                            <div key={`${id}-properties-container`}>
                                <PropertiesChildInput
                                    key={`${id}-properties`}
                                    {...props}
                                    {...l}
                                    // @ts-ignore
                                    control={control}
                                    id={propertyId}
                                    parentId={id}
                                    // updateProperties={updateProperties}
                                    // setValue={setValue}
                                />
                            </div>
                        )
                    })}
            </div>
            <div
                className="d-flex justify-content-center"
                style={{
                    padding: 50
                }}>
                <AdminButton
                    label="Update"
                    style={{ width: "100%" }}
                    onClick={() => updateProperties()}
                />
            </div>
        </div>
    )
}
