import {
    FilterSearchFieldsInterface,
    AdminFilterPanel
} from "./AdminFilterPanel"
import _ from "lodash"

interface FilterOrderPanelInterface {
    updateFilter: (filter: any) => Promise<void>
}

export const AdminFilterOrderPanel: React.FC<FilterOrderPanelInterface> = ({
    updateFilter
}) => {
    const keyTypes = {
        startDate: {
            type: "date",
            value: "",
            label: "Order Date From"
        },
        endDate: {
            type: "date",
            value: "",
            label: "Order Date To"
        },
        orderStatus: {
            type: "dropdown",
            value: [],
            label: "Order Status"
        },
        paymentStatus: {
            type: "dropdown",
            value: "",
            label: "Payment Status"
        },
        shippingStatus: {
            type: "dropdown",
            value: "",
            label: "Shipping Status"
        },
        paymentMethod: {
            type: "dropdown",
            value: "",
            label: "Payment Method"
        },
        store: {
            type: "string",
            value: "",
            label: "Store"
        },
        products: {
            type: "string",
            value: "",
            label: "Products"
        },
        billingPhoneNumber: {
            type: "string",
            value: "",
            label: "Billing Phone Number"
        },
        billingEmail: {
            type: "string",
            value: "",
            label: "Billing Email Address"
        },
        billingLastName: {
            type: "string",
            value: "",
            label: "Billing Last Name"
        },
        billingCountry: {
            type: "string",
            value: "",
            label: "Billing Country"
        },
        orderID: {
            type: "string",
            value: "",
            label: "Order #"
        },
        orderNotes: {
            type: "string",
            value: "",
            label: "Order Notes"
        }
    }

    const getDefaultValues = () => {
        const defaultValues = {}

        Object.keys(keyTypes).map((key: string) => {
            const value = _.get(defaultValues, `${key}.value`)
            _.set(defaultValues, key, value)
            return
        })

        return defaultValues
    }

    return (
        <div>
            <AdminFilterPanel
                searchFieldKeys={Object.keys(keyTypes)}
                searchFieldLabels={Object.values(keyTypes).map(
                    (v: any) => v.label
                )}
                searchFieldType={Object.values(keyTypes).map(
                    (v: any) => v.type
                )}
                searchFieldList={getDefaultValues()}
                searchHandler={updateFilter}
            />
        </div>
    )
}
