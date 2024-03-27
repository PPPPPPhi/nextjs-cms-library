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
        catagory: {
            type: "string",
            value: "",
            label: "Category"
        },
        product: {
            type: "string",
            value: "",
            label: "Product Name"
        },
        amountMin: {
            type: "string",
            value: "",
            label: "Minimum Amount"
        },
        amountMax: {
            type: "string",
            value: "",
            label: "Maximun Amount"
        },
        stockMin: {
            type: "string",
            value: "",
            label: "Minimum Stock"
        },
        stockMax: {
            type: "string",
            value: "",
            label: "Maximun Stock"
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
