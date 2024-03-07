import React, { useMemo, useEffect } from "react"
import { Control, Controller, useForm } from "react-hook-form"
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { PropertyJson, PropertiesComponentProps } from "../../../utils/index"

// @ts-ignore
import DragDropIcon from "./dragdrop.png"
// import { AdminButton } from "@/client/components/admin-components"

type PropertiesChildEmptyProps = {}

export const PropertiesChildEmpty: React.FC<
    PropertiesChildEmptyProps
> = ({}) => {
    return (
        <div
            className="flex flex-col justify-center text-center"
            style={{ marginTop: "15rem" }}>
            <span className="my-3 text-lg text-gray-900 font-bold">
                Select an element to edit
            </span>
            <div className="my-3 flex flex-row justify-center">
                <img className="w-24 h-24" src={DragDropIcon.src} />
            </div>
            <span className="my-3 text-base text-gray-900">None selected</span>
        </div>
    )
}

type PropertiesChildSubInputProps = {
    name: string
    label: string
    value: string
    control: Control<PropertyJson, any, PropertyJson>
    isChildren?: boolean
}

export const PropertiesChildSubInput: React.FC<
    PropertiesChildSubInputProps
> = ({ name, label, value, control, isChildren = false }) => {
    const fieldValue = value

    const getRowHeight = () => {
        if (label == "Label") return 3
        if (label == "Value") return 8
        return 5
    }

    return (
        <div
            style={{
                margin: 10
            }}>
            <Controller
                control={control}
                // @ts-ignore
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (
                        <div>
                            <p className="mb-1 text-gray-500 dark:text-gray-400">
                                {label}
                            </p>

                            <textarea
                                id="message"
                                style={{ padding: 10 }}
                                rows={getRowHeight()}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your thoughts here..."
                                onChange={(evt) => {
                                    onChange(evt)
                                }}
                                // @ts-ignore
                                value={value}></textarea>
                        </div>
                    )
                }}
            />
        </div>
    )
}

type PropertiesChildInputProps = PropertiesComponentProps & {
    control: Control<PropertyJson, any, PropertyJson>
    updateProperties: () => void
    isChildren?: boolean
    parentId?: string
}

export const PropertiesChildInput: React.FC<PropertiesChildInputProps> = ({
    id,
    element,
    label,
    placeholder,
    value,
    type,
    index,
    control,
    isChildren = false,
    parentId,
    childType,
    updateProperties
}) => {
    const { focusEditId } = useDisplayPanelContext()

    const path = !isChildren ? "" : `children.${index}.`

    const displayEdit = useMemo(() => {
        if (!parentId) return false

        return (
            (focusEditId?.id == parentId &&
                focusEditId?.childType == childType) ||
            (focusEditId?.id == parentId && !isChildren)
        )
    }, [focusEditId])

    return (
        <div
            className=""
            style={{
                display: displayEdit ? "block" : "none"
            }}>
            {!type && <PropertiesChildEmpty />}
            {type && (
                <div>
                    <form id={id}>
                        <PropertiesChildSubInput
                            control={control}
                            name={`${path}label`}
                            label={"Label"}
                            value={label}
                            isChildren={isChildren}
                        />

                        <PropertiesChildSubInput
                            control={control}
                            name={`${path}value`}
                            label={"Value"}
                            value={value ?? placeholder}
                            isChildren={isChildren}
                        />
                    </form>

                    <div
                        style={{
                            padding: 20,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}>
                        {/* <AdminButton
                            label="Update"
                            style={{ width: "100%" }}
                            onClick={updateProperties}
                        /> */}

                        <div
                            style={{
                                width: "100%",
                                height: 30,
                                borderRadius: 25
                            }}
                            onClick={updateProperties}
                            className={`flex justify-center cursor-pointer s-adminGradientBg shadow s-text-color-nu font-medium rounded-full text-sm p-2.5 text-center items-center me-2`}>
                            <span>Update</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
