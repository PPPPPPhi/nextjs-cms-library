import {
    FilterSearchFieldsInterface,
    AdminFilterPanel
} from "./AdminFilterPanel"
import _ from "lodash"

interface FilterProductPanelInterface {
    updateFilter: (filter: any) => Promise<void>
}

export const AdminFilterProductPanel: React.FC<FilterProductPanelInterface> = ({
    updateFilter
}) => {
    const keyTypes = {
        category: {
            type: "dropdown",
            value: "",
            label: "category"
        },
        product: {
            type: "string",
            value: "",
            label: "Product Name"
        },
        origin: {
            type: "string",
            value: "",
            label: "Product Origin"
        },
        expiryDate: {
            type: "date",
            value: "",
            label: "Expiry Date Before"
        },
        amountMin: {
            type: "number",
            value: "",
            label: "Minimum Amount"
        },
        amountMax: {
            type: "number",
            value: "",
            label: "Maximun Amount"
        },
        stockMin: {
            type: "number",
            value: "",
            label: "Minimum Stock"
        },
        stockMax: {
            type: "number",
            value: "",
            label: "Maximun Stock"
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
