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
        description: {
            type: "string",
            value: "",
            label: "Description"
        },
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
        pickUp: {
            type: "dropdown",
            value: "",
            label: "Pick Up Option"
        },
        customerId: {
            type: "string",
            value: "",
            label: "Customer ID"
        },
        total: {
            type: "number",
            value: "",
            label: "Order Total ($)"
        },
        remark: {
            type: "string",
            value: "",
            label: "Order Remark"
        },
        orderAddress: {
            type: "string",
            value: "",
            label: "Order Address"
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
