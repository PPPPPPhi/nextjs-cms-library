import { HiPencil } from "react-icons/hi"
import {
    booleanDropDown,
    orderStatusDropDown,
    paymentStatusDropDown
} from "../filter/utils"
import Dropdown from "react-dropdown"
import { useForm, Controller } from "react-hook-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
    HiChevronDown,
    HiChevronUp,
    HiGlobeAsiaAustralia
} from "react-icons/hi2"
import { AdminTablePreviewPhoto } from ".."

interface ItemDetailsValueInterface {}

interface ItemDetailsInterface {
    keys: string[]
    labels: string[]
    types: string[]
    values: ItemDetailsValueInterface & any
    updateDetails: (data: any) => void
    readOnly: boolean
}

export const ItemDetails: React.FC<ItemDetailsInterface> = ({
    keys,
    labels,
    types,
    values,
    updateDetails,
    readOnly
}) => {
    const { control, getValues, setValue } = useForm({
        defaultValues: values
    })

    return (
        <div className="d-flex align-items-center" style={{}}>
            <div className={``}>
                {keys &&
                    keys.map((search: string, index: number) => (
                        <div className={`px-3 py-1 s-select-area`}>
                            <div className="text-lg text-font-bold">
                                {labels[index]}
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
                                        const type = types[index]

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
                                                            if (readOnly) return
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
                                                            (value as unknown as Date) ??
                                                            new Date()
                                                        }
                                                        onSelect={() => {}} //when day is clicked
                                                        onChange={(evt) => {
                                                            if (readOnly) return

                                                        
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
                                                        //@ts-ignore
                                                        options={
                                                            booleanDropDown
                                                        }
                                                        onChange={(evt) => {
                                                            if (readOnly) return

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
                                                            if (readOnly) return

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
                                                            if (readOnly) return

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
                                        } else if (type === "photo") {
                                            return (
                                                <div
                                                    style={{
                                                        width: 300,
                                                        objectFit: "contain"
                                                    }}>
                                                    <AdminTablePreviewPhoto
                                                        value={value}
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
        </div>
    )
}
