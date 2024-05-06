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
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" }
]

export const paymentStatusDropDown = [
    // { label: "All Status", value: "" },
    { label: "Refunded", value: "Refunded" },
    { label: "Pending", value: "Pending" },
    { label: "Paid", value: "Paid" }
]

export const categoryDropDown = [
    { label: "Apparel", value: "Apparel" },
    { label: "Digital downloads", value: "Digital downloads" },
    { label: "Books", value: "Books" },
    { label: "Computers", value: "Computers" },
    { label: "Jewelry", value: "Jewelry" },
    { label: "Gift Cards", value: "Gift Cards" },
    { label: "Electronics", value: "Electronics" },
    { label: "Fashion", value: "Fashion" },
    { label: "Home Decor", value: "Home Decor" },
    { label: "Home Appliances", value: "Home Appliances" },
    { label: "Toys", value: "Toys" },
    { label: "Beauty", value: "Beauty" },
    { label: "Garden", value: "Garden" },
    { label: "Health & Wellness", value: "Health & Wellness" },
    { label: "Pets", value: "Pets" },
    { label: "Sports", value: "Sports" },
    { label: "Kitchenware", value: "Kitchenware" },
    { label: "Furniture", value: "Furniture" }
]

export const manufacturersDropDown = [
    { label: "Apple", value: "Apple" },
    { label: "HP", value: "HP" },
    { label: "Nike", value: "Nike" },
    { label: "ABC Clothing", value: "ABC Clothing" },
    { label: "XYZ Athletics", value: "XYZ Athletics" },
    { label: "Tech Solutions", value: "Tech Solutions" },
    { label: "Tech Innovators", value: "Tech Innovators" },
    { label: "Fitness Gear", value: "Fitness Gear" },
    { label: "SoundTech", value: "SoundTech" },
    { label: "CapturePro", value: "CapturePro" },
    { label: "Adventure Gear", value: "Adventure Gear" },
    { label: "AudioTech", value: "AudioTech" },
    { label: "FitTech", value: "FitTech" },
    { label: "KitchenPro", value: "KitchenPro" },
    { label: "TechVision", value: "TechVision" },
    { label: "PowerTech", value: "PowerTech" }
]

export const productTypeDropDown = [
    { label: "Simple", value: "Simple" },
    { label: "Grouped", value: "Grouped" }
]

export const warehouseDropDown = [
    { label: "Warehouse A", value: "Warehouse A" },
    { label: "Warehouse B", value: "Warehouse B" },
    { label: "Warehouse C", value: "Warehouse C" }
]

export const shippingStatusDropDown = [
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Not Shipped", value: "Not Shipped" },
    { label: "In Transit", value: "In Transit" },
    { label: "Shipped", value: "Shipped" },
    { label: "Out for Delivery", value: "Out for Delivery" }
]

export const paymentMethodDropDown = [
    { label: "Credit Card", value: "Credit Card" },
    { label: "PayPal", value: "PayPal" },
    { label: "Bank Transfer", value: "Bank Transfer" },
    { label: "Cash", value: "Cash" }
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

export const multiSelectFilterField = [
    "orderStatus",
    "paymentStatus",
    "categories",
    "manufacturers",
    "productType",
    "warehouse",
    "paymentMethod"
]

export const getDropDownOptions = (search: string) => {
    let options
    switch (search) {
        case "orderStatus":
            options = orderStatusDropDown
            break
        case "paymentStatus":
            options = paymentStatusDropDown
            break
        case "categories":
            options = categoryDropDown
            break
        case "manufacturers":
            options = manufacturersDropDown
            break
        case "productType":
            options = productTypeDropDown
            break
        case "warehouse":
            options = warehouseDropDown
            break
        case "shippingStatus":
            options = shippingStatusDropDown
            break
        case "paymentMethod":
            options = paymentMethodDropDown
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
