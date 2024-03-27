import _ from "lodash"
import Dropdown from "react-dropdown"
import { useForm, Controller } from "react-hook-form"
import { AdminButton } from "@nextjs-cms-library/admin-components/index"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {
    HiChevronDown,
    HiChevronUp,
    HiGlobeAsiaAustralia
} from "react-icons/hi2"
import {
    booleanDropDown,
    orderStatusDropDown,
    paymentStatusDropDown
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
    orderStatus?: string
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

    const handleSearchFilter = () => {
        console.log(`current panel values:`, getValues())
        searchHandler(getValues())
    }

    return (
        <div className="shadow p-2 mb-4">
            <div className="text-level-headline text-font-bold s-text-color-alpha pb-3">
                Search
            </div>

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
                                                        onSelect={() => {}} //when day is clicked
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
                                        } else if (type === "boolean") {
                                            return (
                                                <div
                                                    className={`s-filter-dropdown`}>
                                                    <Dropdown
                                                        options={
                                                            booleanDropDown
                                                        }
                                                        onChange={(evt) => {
                                                            onChange(evt?.value)
                                                        }}
                                                        // @ts-ignore
                                                        value={value}
                                                        placeholder="All Status"
                                                        arrowClosed={
                                                            <HiChevronDown className="Dropdown-arrow" />
                                                        }
                                                        arrowOpen={
                                                            <HiChevronUp className="Dropdown-arrow" />
                                                        }
                                                    />
                                                </div>
                                            )
                                        } else if (type === "orderStatus") {
                                            return (
                                                <div>
                                                    <Dropdown
                                                        className={`s-filter-dropdown`}
                                                        options={
                                                            orderStatusDropDown
                                                        }
                                                        onChange={(evt) => {
                                                            onChange(evt?.value)
                                                        }}
                                                        // @ts-ignore
                                                        value={value}
                                                        placeholder="All Status"
                                                        arrowClosed={
                                                            <HiChevronDown className="Dropdown-arrow" />
                                                        }
                                                        arrowOpen={
                                                            <HiChevronUp className="Dropdown-arrow" />
                                                        }
                                                    />
                                                </div>
                                            )
                                        } else if (type === "paymentStatus") {
                                            return (
                                                <div
                                                    className={`s-filter-dropdown`}>
                                                    <Dropdown
                                                        options={
                                                            paymentStatusDropDown
                                                        }
                                                        onChange={(evt) => {
                                                            onChange(evt?.value)
                                                        }}
                                                        // @ts-ignore
                                                        value={value}
                                                        placeholder="All Status"
                                                        arrowClosed={
                                                            <HiChevronDown className="Dropdown-arrow" />
                                                        }
                                                        arrowOpen={
                                                            <HiChevronUp className="Dropdown-arrow" />
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
                className="text-level-body"
                style={{
                    padding: 20,
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
    )
}
