import _ from "lodash"
import Dropdown from "react-dropdown"
import { useForm, Controller } from "react-hook-form"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MultiSelect } from "react-multi-select-component"
import { useState } from "react"

import { HiChevronDown, HiChevronUp } from "react-icons/hi2"
import {
    MagnifyingGlassSvg,
    booleanDropDown,
    selectDropDownType,
    orderStatusDropDown,
    paymentStatusDropDown,
    getDropDownOptions,
    getParsedFilterValues
} from "./utils"

export type FilterSearchField = {
    field: string
    type: string
}

export type FilterSearchFieldList = {
    values: FilterSearchField[]
}

export enum FilterSearchType {
    STRING = "string",
    BOOLEAN = "boolean",
    NUMBER = "number"
}

interface FilterSearchSubFieldsInterface {
    type: string
    value: string
}

export interface FilterSearchFieldsInterface {
    description?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orderStatus?: string[]
    paymentStatus?: boolean | null
    customerId?: string
    total?: string
    remark?: string
    pickUp?: boolean | null
    orderAddress?: string
}

interface FilterPanelInterface {
    searchFieldKeys: string[]
    searchFieldLabels: string[]
    searchFieldType: string[]
    searchFieldList: FilterSearchFieldsInterface
    searchHandler: (filter: any) => Promise<void>
}

export const AdminFilterPanel: React.FC<FilterPanelInterface> = ({
    searchFieldKeys,
    searchFieldLabels,
    searchFieldType,
    searchFieldList,
    searchHandler
}) => {
    const { control, getValues, setValue } = useForm({
        defaultValues: searchFieldList
    })

    const [isDisplay, setDisplay] = useState<boolean>(false)

    const handleSearchFilter = () => {
        console.log(`current panel values:`, getValues())

        searchHandler(getParsedFilterValues(getValues()))
    }

    return (
        <div className="shadow p-2 mb-4">
            <div
                className="d-flex cursor-pointer flex-row align-itmes-center justify-content-between text-level-headline text-font-bold s-text-color-alpha p-2 s-section-primary rounded-2 "
                onClick={() => setDisplay(!isDisplay)}>
                <div className="d-flex flex-row align-items-center">
                    <span className="px-2">
                        <MagnifyingGlassSvg width={24} height={24} />
                    </span>
                    <span className="px-2 text-level-headline text-font-bold">
                        Search
                    </span>
                </div>

                <div className="rounded d-flex align-itmes-center p-2">
                    <div className={`${isDisplay ? "d-block" : "d-none"}`}>
                        <HiChevronUp width={24} height={24} />
                    </div>
                    <div className={`${!isDisplay ? "d-block" : "d-none"}`}>
                        <HiChevronDown width={24} height={24} />
                    </div>
                </div>
            </div>

            <div className={`${isDisplay ? "d-block py-2" : "d-none"}`}>
                <div className="d-flex flex-wrap">
                    {searchFieldKeys &&
                        searchFieldKeys.map((search: string, index: number) => (
                            <div className={`px-3 py-1 col-12 col-sm-6 d-flex`}>
                                <div className="text-lg text-font-bold col-6">
                                    {searchFieldLabels[index]}
                                </div>

                                <div
                                    className={`col-6`}
                                    style={{ border: "1px solid #8F8F8F" }}>
                                    <Controller
                                        control={control}
                                        // @ts-ignore
                                        name={search}
                                        // @ts-ignore
                                        render={({
                                            field: { onChange, value }
                                        }) => {
                                            const type = searchFieldType[index]

                                            if (type === "string")
                                                return (
                                                    <input
                                                        id="message"
                                                        className="w-100 s-text-color-alpha"
                                                        style={{
                                                            height: 36,
                                                            resize: "none",
                                                            padding: 5
                                                        }}
                                                        onChange={(evt) => {
                                                            onChange(evt)
                                                        }}
                                                        // @ts-ignore
                                                        value={value}></input>
                                                )
                                            else if (type === "number")
                                                return (
                                                    <input
                                                        id="message"
                                                        className="w-100 s-text-color-alpha"
                                                        type="number"
                                                        style={{
                                                            height: 36,
                                                            resize: "none",
                                                            padding: 5
                                                        }}
                                                        onChange={(evt) => {
                                                            onChange(evt)
                                                        }}
                                                        // @ts-ignore
                                                        value={value}></input>
                                                )
                                            else if (type === "date") {
                                                return (
                                                    <DatePicker
                                                        selected={
                                                            (value as Date) ??
                                                            new Date()
                                                        }
                                                        onChange={(evt) => {
                                                            console.log(
                                                                `date picker`,
                                                                evt
                                                            )
                                                            onChange(evt)
                                                        }} //only when value has changed
                                                    />
                                                )
                                            } else if (type === "dropdown") {
                                                return (
                                                    <MultiSelect
                                                        className={`s-filter-dropdown`}
                                                        options={getDropDownOptions(
                                                            search
                                                        )}
                                                        labelledBy={"Select"}
                                                        isCreatable={true}
                                                        onChange={(
                                                            evt: any
                                                        ) => {
                                                            onChange(evt)
                                                            return
                                                        }}
                                                        // @ts-ignore
                                                        value={
                                                            (value as string[]) ??
                                                            []
                                                        }
                                                    />
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>

                <div className="text-level-body p-4 d-flex justify-content-end">
                    <AdminButton
                        label="Search"
                        style={{ width: "250px" }}
                        onClick={handleSearchFilter}
                    />
                </div>
            </div>
        </div>
    )
}
