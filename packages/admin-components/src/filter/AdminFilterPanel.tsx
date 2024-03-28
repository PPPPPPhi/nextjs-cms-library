import _ from "lodash"
import Dropdown from "react-dropdown"
import { useForm, Controller } from "react-hook-form"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MultiSelect } from "react-multi-select-component"
import { useState } from "react"

import {
    HiChevronDown,
    HiChevronUp,
    HiGlobeAsiaAustralia
} from "react-icons/hi2"
import {
    MagnifyingGlassSvg,
    booleanDropDown,
    selectDropDownType,
    orderStatusDropDown,
    paymentStatusDropDown,
    getDropDownOptions,
    getParsedFilterValues
} from "./utils"
import {
    HiArrowDown,
    HiArrowUp,
    HiOutlineArrowDown,
    HiOutlineArrowNarrowDown,
    HiOutlineArrowNarrowUp,
    HiOutlineArrowUp
} from "react-icons/hi"

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
                className="d-flex flex-row justify-content-between text-level-headline text-font-bold s-text-color-alpha p-3"
                onClick={() => setDisplay(!isDisplay)}>
                <div className="d-flex flex-row">
                    <span className="px-2">
                        <MagnifyingGlassSvg width={32} height={32} />
                    </span>
                    <span className="px-2">Search</span>
                </div>

                <div className="rounded border p-2">
                    <div className={`${isDisplay ? "d-block" : "d-none"}`}>
                        <HiArrowUp />
                    </div>
                    <div className={`${!isDisplay ? "d-block" : "d-none"}`}>
                        <HiArrowDown />
                    </div>
                </div>
            </div>

            <div className={`${isDisplay ? "d-block" : "d-none"}`}>
                <div className={`s-select-area`}>
                    {searchFieldKeys &&
                        searchFieldKeys.map((search: string, index: number) => (
                            <div className={`px-3 py-1 s-select-area`}>
                                <div className="text-lg text-font-bold">
                                    {searchFieldLabels[index]}
                                </div>

                                <div
                                    className={`border-solid border-2 border-indigo-600`}>
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
                                                    <div>
                                                        <textarea
                                                            id="message"
                                                            rows={1}
                                                            className="s-text-color-alpha"
                                                            style={{
                                                                resize: "none"
                                                            }}
                                                            onChange={(evt) => {
                                                                onChange(evt)
                                                            }}
                                                            // @ts-ignore
                                                            value={
                                                                value
                                                            }></textarea>
                                                    </div>
                                                )
                                            else if (type === "date") {
                                                return (
                                                    <div>
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
                                                    </div>
                                                )
                                            } else if (type === "dropdown") {
                                                return (
                                                    <div>
                                                        <MultiSelect
                                                            className={`s-filter-dropdown`}
                                                            options={getDropDownOptions(
                                                                search
                                                            )}
                                                            labelledBy={
                                                                "Select"
                                                            }
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
                                                    </div>
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>

                <div
                    className="text-level-body p-4"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
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
