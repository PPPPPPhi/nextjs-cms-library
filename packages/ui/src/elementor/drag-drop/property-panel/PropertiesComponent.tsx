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
        data
        // isLayout,
    } = props
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

        setValue("label", label)
        setValue("value", value)

        if (!children) return

        children?.map((child: any, index: number) => {
            setValue(`children.${index}.label`, children?.[index]?.label ?? "")
            setValue(`children.${index}.value`, children?.[index]?.value ?? "")
        })
    }, [data])

    const isLayout = useMemo(() => {
        // @ts-ignore
        return Object.values(LayoutNameMap).includes(element)
    }, [element, children])

    const updateProperties = () => {
        // console.log(`update properties getValues()`, children, getValues())
        if (!isLayout) {
            setUpdateElementId({
                action: UpdateEditElementAction.UPDATE,
                id,
                index,
                values: {
                    ...(getValues() as PropertiesComponentProps),
                    id: id
                }
            })
        } else {
            if (!children) {
                console.error(`[property] getValues() error`)
                return
            }
            const renewChild = (children: any, values: any) => {
                children.map((child: any, index: number) => {
                    const childValue = values?.children?.[index]

                    _.set(child, "label", childValue?.label)
                    _.set(child, "value", childValue?.value)

                    console.log(`child update`, child)
                })

                return children
            }

            setUpdateElementId({
                action: UpdateEditElementAction.UPDATE,
                id,
                index,
                values: {
                    ...(getValues() as PropertiesComponentProps),
                    id: id,
                    element: element,
                    label,
                    placeholder,
                    value,
                    type,
                    index,
                    children: renewChild(children, getValues())
                }
            })
        }
    }

    return (
        <div className="" style={{ display: allowDisplay }}>
            <div className={`ml-2.5 text-gray-500 dark:text-gray-400`}>
                <span>{`Widget Type: ${element}`}</span>
            </div>

            <div className="overflow-y-auto">
                {!isLayout && (
                    <div>
                        <PropertiesChildInput
                            key={`${id}-main-${index}`}
                            {...props}
                            // @ts-ignore
                            control={control}
                            parentId={id}
                            updateProperties={updateProperties}
                            setValue={setValue}
                        />
                    </div>
                )}
                {isLayout &&
                    children &&
                    children.length != 0 &&
                    children.map((item: PropertyJson, index: number) => {
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
            </div>
        </div>
    )
}
