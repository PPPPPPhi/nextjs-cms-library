import React from "react"
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import _ from "lodash"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { PropertyJson } from "../../../core/utils/type/index"
import { PropertiesComponentProps } from "../../../utils/index"
import { getPropertiesComponent } from "../../maps/PropertiesComponentMap"

type PropertiesChildSubInputProps = {
    type: string
    name: string
    label: string
    control: Control<PropertyJson, PropertyJson>
    isChildren?: boolean
    options?: string[]
}

const PropertyTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <p className="s-text-color-beta text-level-caption mb-1 text-gray-500 dark:text-gray-400">
            {title}
        </p>
    )
}

export const PropertiesChildSubInput: React.FC<
    PropertiesChildSubInputProps
> = ({ name, label, control, type, options }) => {
    const Component = getPropertiesComponent(type)

    return (
        <div className={`my-3`}>
            <PropertyTitle title={label} />
            <Controller
                control={control}
                // @ts-ignore
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (
                        //@ts-ignore
                        <Component
                            label={label}
                            defaultValue={value}
                            onChange={(v: any) => {
                                onChange(v)
                            }}
                            options={options}
                            value={value}
                        />
                    )
                }}
            />
        </div>
    )
}

type PropertiesChildInputProps = PropertiesComponentProps & {
    element_id: string
    control: Control<PropertyJson, PropertyJson>
    // updateProperties: () => void
    isChildren?: boolean
    parentId?: string
    // setValue?: UseFormSetValue<PropertiesComponentProps>
    options?: string[]
}

export const PropertiesChildInput: React.FC<PropertiesChildInputProps> = ({
    id,
    label,
    type,
    control,
    isChildren = false,
    options,
    element_id
}) => {
    return (
        <div className="">
            <div>
                <form id={id}>
                    <PropertiesChildSubInput
                        control={control}
                        name={`${id}.${element_id}`}
                        label={label as string}
                        isChildren={isChildren}
                        type={type}
                        options={options}
                    />
                </form>
            </div>
        </div>
    )
}
