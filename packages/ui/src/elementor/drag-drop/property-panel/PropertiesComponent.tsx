import React, { useMemo, useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { PropertyJson, LayoutNameMap } from "@nextjs-cms-library/ui/index"
import {
    DefaultPropertiesDataType,
    ElementNameMap,
    PropertiesComponentProps,
    UpdateEditElementAction
} from "../../../utils/index"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesChildInput } from "./PropertiesChildInput"
import { ImageSelector } from "./file-handler/FileSelector"

export const PropertiesComponent: React.FC<
    PropertiesComponentProps & DefaultPropertiesDataType
> = (props: PropertiesComponentProps & DefaultPropertiesDataType) => {
    const {
        id,
        element,
        label,
        placeholder,
        value,
        type,
        index,
        children,
        data,
        properties
        // isLayout,
    } = props

    console.log("properties props", props)

    const { focusEditId, setUpdateElementId } = useDisplayPanelContext()

    const { control, getValues, setValue } = useForm({
        defaultValues: data
    })
    const allowDisplay = useMemo(() => {
        // console.log(`[edit] focusEdit `, focusEditId)
        return focusEditId?.id == id ? "block" : "none"
    }, [focusEditId])

    useEffect(() => {
        if (!data) return

        console.log("vvvvv dddd", data)

        let defaultV = {}
        data.properties?.forEach((k) => {
            defaultV = { ...defaultV, [k.label]: k.value }
        })

        setValue(data.id, defaultV)

        if (!children) return

        children?.forEach((child: any, index: number) => {
            let defaultChildV = {}
            if (!child.properties) return
            child?.properties?.forEach((k) => {
                defaultChildV = { ...defaultChildV, [k.label]: k.value }
            })
            // setValue(`children.${index}.label`, children?.[index]?.label ?? "")
            // setValue(`children.${index}.value`, children?.[index]?.value ?? "")
            setValue(child.id, defaultChildV)
        })
    }, [data])

    const isLayout = useMemo(() => {
        // @ts-ignore
        return Object.values(LayoutNameMap).includes(element)
    }, [element, children])

    const updateProperties = () => {
        console.log(`update properties getValues()`, children, getValues())
        const values = getValues()

        console.log("KKKKKKKKKKKKKK", values)
        console.log("EEEEEEEEEEEEEEEE", element)
        const renewChild = () => {
            const newChildren = children?.map((child: any, index: number) => {
                console.log(`child update`, child.properties)
                console.log("child update 2", values)

                return {
                    ...child,
                    properties: child?.properties?.map((k) => {
                        return {
                            ...k,
                            value: values[child.id][k.label]
                        }
                    })
                }
            })

            return newChildren
        }
        setUpdateElementId({
            action: UpdateEditElementAction.UPDATE,
            id,
            index,
            values: {
                ...(values as PropertiesComponentProps),
                id: id,
                properties: properties?.map((l) => {
                    return { ...l, value: values[id][l.label] }
                }),
                element,
                label,
                placeholder,
                value,
                type,
                index,
                children: renewChild()
            }
        })

        // if (!isLayout || focusEditId.childType == "parent") {
        //     const values = getValues()

        //     console.log("KKKKKKKKKKKKKK",values)
        //     console.log("EEEEEEEEEEEEEEEE", element)
        //     setUpdateElementId({
        //         action: UpdateEditElementAction.UPDATE,
        //         id,
        //         index,
        //         values: {
        //             ...(values as PropertiesComponentProps),
        //             id: id,
        //             properties: properties.map((l) => {
        //                 return { ...l, value: values[id][l.label] }
        //             }),
        //             element
        //         }
        //     })
        // } else {
        //     if (!children) {
        //         console.error(`[property] getValues() error`)
        //         return
        //     }
        //     console.log("children", children)

        //     // const renewChild = (children: any, values: any) => {
        //     //     children.map((child: any, index: number) => {
        //     //         const childValue = values?.children?.[index]

        //     //         _.set(child, "label", childValue?.label)
        //     //         _.set(child, "value", childValue?.value)

        //     //         console.log(`child update`, child)
        //     //     })

        //     //     return children
        //     // }

        //     const values = getValues()
        //     const renewChild = () => {
        //         const newChildren = children.map(
        //             (child: any, index: number) => {
        //                 console.log(`child update`, child.properties)
        //                 console.log("child update 2", values)

        //                 return {
        //                     ...child,
        //                     properties: child?.properties?.map((k) => {
        //                         return {
        //                             ...k,
        //                             value: values[child.id][k.label]
        //                         }
        //                     })
        //                 }
        //             }
        //         )

        //         return newChildren
        //     }

        //     setUpdateElementId({
        //         action: UpdateEditElementAction.UPDATE,
        //         id,
        //         index,
        //         values: {
        //             ...(getValues() as PropertiesComponentProps),
        //             id: id,
        //             element: element,
        //             label,
        //             placeholder,
        //             value,
        //             type,
        //             index,
        //             children: renewChild()
        //         }
        //     })
        // }
    }

    return (
        <div className="" style={{ display: allowDisplay }}>
            <div className="s-text-color-alpha">
                <span>{`Widget Type: ${element}`}</span>
            </div>

            <div className="overflow-y-auto">
                {(!isLayout || focusEditId.childType == "parent") &&
                    properties?.map((l) => {
                        return (
                            <div>
                                <div>{`${focusEditId.childType}`}</div>
                                <PropertiesChildInput
                                    key={`${id}-main-${index}`}
                                    {...props}
                                    {...l}
                                    // @ts-ignore
                                    control={control}
                                    parentId={id}
                                    updateProperties={updateProperties}
                                    setValue={setValue}
                                />
                            </div>
                        )
                    })}
                {isLayout &&
                    focusEditId.childType != "parent" &&
                    children &&
                    children.length != 0 &&
                    children.map((item: PropertyJson, index: number) => {
                        if (item.properties)
                            return item?.properties?.map((l) => {
                                return (
                                    <div key={`property_child_input_${index}`}>
                                        <PropertiesChildInput
                                            key={`${id}-child-${index}`}
                                            {...item}
                                            {...l}
                                            id={
                                                item?.id ??
                                                `${id}-child-${index}`
                                            }
                                            index={index}
                                            // @ts-ignore
                                            control={control}
                                            isChildren={true}
                                            parentId={id}
                                            updateProperties={updateProperties}
                                            setValue={setValue}
                                        />
                                    </div>
                                )
                            })
                        else
                            return (
                                <div key={`property_child_input_${index}`}>
                                    <PropertiesChildInput
                                        key={`${id}-child-${index}`}
                                        {...item}
                                        id={item?.id ?? `${id}-child-${index}`}
                                        index={index}
                                        // @ts-ignore
                                        control={control}
                                        isChildren={true}
                                        parentId={id}
                                        updateProperties={updateProperties}
                                        setValue={setValue}
                                    />
                                </div>
                            )
                    })}
                <div
                    style={{
                        padding: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                    <AdminButton
                        label="Update"
                        style={{ width: "100%" }}
                        onClick={updateProperties}
                    />

                    {/* <div
                            style={{
                                width: "100%",
                                height: 30,
                                borderRadius: 25
                            }}
                            onClick={updateProperties}
                            className={`flex justify-center cursor-pointer s-adminGradientBg shadow s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center items-center me-2`}>
                            <span>Update</span>
                        </div> */}
                </div>
            </div>
        </div>
    )
}
