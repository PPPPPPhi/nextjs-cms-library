import _ from "lodash"

type SvgProps = {
    classname?: string
    width?: number
    height?: number
    color?: string
}

export type selectDropDownType = {
    label: string
    value: string
}

export const orderStatusDropDown = [
    // { label: "All Status", value: "" },
    { label: "confirming", value: "confirming" },
    { label: "delivering", value: "delivering" },
    { label: "done", value: "done" }
]

export const paymentStatusDropDown = [
    // { label: "All Status", value: "" },
    { label: "Await Payment", value: "false" },
    { label: "Paid", value: "true" }
]

export const booleanDropDown = [
    // { label: "All Status", value: "" },
    { label: "Yes", value: "true" },
    { label: "No", value: "false" }
]

export const MagnifyingGlassSvg: React.FC<SvgProps> = ({
    width = 16,
    height = 16,
    color = "currentColor"
}) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill={color}
                className="bi bi-search"
                viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
        </div>
    )
}

export const multiSelectFilterField = ["orderStatus", "paymentStatus", "pickUp"]

export const getDropDownOptions = (search: string) => {
    let options
    switch (search) {
        case "orderStatus":
            options = orderStatusDropDown
            break
        case "paymentStatus":
            options = paymentStatusDropDown
            break
        default:
            options = booleanDropDown
            break
    }
    return options
}

export const getParsedFilterValues = (filterValues: any) => {
    const parsedValues = filterValues

    multiSelectFilterField.forEach((key: string) => {
        const value = filterValues?.[key]

        if (!value) return

        const cleanValue = _.join(
            (value as unknown as selectDropDownType[])?.map(
                (status: selectDropDownType) => status?.value
            ),
            ","
        )

        console.log(`current panel values order`, cleanValue)
        _.set(parsedValues, key, cleanValue)

        return
    })

    console.log(`getParsedFilterValues values`, parsedValues)
    return parsedValues
}
