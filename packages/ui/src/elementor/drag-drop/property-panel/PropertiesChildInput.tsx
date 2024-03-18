import React, { useMemo, useEffect } from "react"
import { Control, Controller, UseFormSetValue, useForm } from "react-hook-form"
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { PropertyJson } from "../../../core/utils/type/index"
import {
    PropertiesComponentProps,
    ElementNameMap,
    DragDropElementInputList,
    DragDropElementSelectFileList
} from "../../../utils/index"
import { RichTextEditor } from "./rich-text-editor"

// @ts-ignore
import DragDropIcon from "./dragdrop.png"
import { FileSelector, ImageSelector } from "./file-handler/FileSelector"
import { AdminSelect } from "@nextjs-cms-library/admin-components/index"
import { Selector } from "./selector/Selector"
import { ColorPicker } from "../color-picker/ColorPicker"

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
    type: string
    name: string
    label: string
    value: string
    control: Control<PropertyJson, any, PropertyJson>
    isChildren?: boolean
}

export const PropertiesChildSubInput: React.FC<
    PropertiesChildSubInputProps
> = ({ name, label, value, control, element, type, options }) => {
    const fieldValue = value

    console.log("hoho", { name, label, value, control, element, type, options })

    const getRowHeight = () => {
        if (label == "Label") return 3
        if (label == "Value") return 8
        return 5
    }

    const getTitle = () => {
        return (
            <p className="s-text-color-alpha mb-1 text-gray-500 dark:text-gray-400">
                {label}
            </p>
        )
    }

    return (
        <div className={`my-3`}>
            <Controller
                control={control}
                // @ts-ignore
                name={name}
                render={({ field: { onChange, value } }) => {
                    console.log("vvvvvv", value)

                    if (!label) return <></>

                    if (type === "text")
                        return (
                            <div>
                                {getTitle()}
                                <textarea
                                    id="message"
                                    style={{ padding: 10 }}
                                    rows={3}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                    onChange={(evt) => {
                                        onChange(evt)
                                    }}
                                    // @ts-ignore
                                    value={value}></textarea>
                            </div>
                        )
                    else if (type === "editor") {
                        return (
                            <div>
                                {getTitle()}
                                <RichTextEditor
                                    defaultValue={value}
                                    onChange={(v) => onChange(v)}
                                />
                            </div>
                        )
                    } else if (type === "image") {
                        return (
                            <div>
                                {getTitle()}
                                <FileSelector
                                    control={control}
                                    label={label}
                                    value={value}
                                    element={element}
                                    setValue={(v) => onChange(v)}
                                />
                            </div>
                        )
                    } else if (type === "select") {
                        return (
                            <div>
                                {getTitle()}
                                <Selector
                                    options={options}
                                    onSelect={(v) => onChange(v)}
                                    defaultValue={value}
                                />
                            </div>
                        )
                    } else if (type === "colorPicker") {
                        return (
                            <div>
                                {getTitle()}
                                <ColorPicker
                                    defaultValue={value}
                                    onChange={(v) => onChange(v)}
                                />
                            </div>
                        )
                    }
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
    setValue?: UseFormSetValue<PropertiesComponentProps>
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
    options,
    updateProperties,
    setValue
}) => {
    console.log("property inside", {
        id,
        element,
        label,
        placeholder,
        value,
        type,
        index,
        control,
        isChildren,
        parentId,
        childType,
        updateProperties,
        setValue
    })

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
            {/* {!type && <PropertiesChildEmpty />} */}
            <div>
                <form id={id}>
                    <PropertiesChildSubInput
                        control={control}
                        name={`${id}.${label}`}
                        label={label}
                        value={value}
                        isChildren={isChildren}
                        type={type}
                        element={element}
                        options={options}
                    />

                    {/* <PropertiesChildSubInput
                            control={control}
                            name={`${path}label`}
                            label={"Label"}
                            value={label}
                            isChildren={isChildren}
                        />

                        {_.includes(DragDropElementInputList, element) && (
                            <PropertiesChildSubInput
                                control={control}
                                name={`${path}value`}
                                label={"Value"}
                                value={value ?? placeholder}
                                isChildren={isChildren}
                            />
                        )}

                        {_.includes(DragDropElementSelectFileList, element) && (
                            <FileSelector
                                control={control}
                                name={`${path}value`}
                                label={"Value"}
                                value={value ?? placeholder}
                                isChildren={isChildren}
                                element={element}
                                setValue={setValue}
                            />
                        )} */}
                </form>
            </div>
        </div>
    )
}
