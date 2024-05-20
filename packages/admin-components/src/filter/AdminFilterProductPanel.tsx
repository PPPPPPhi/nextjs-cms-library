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
        product: {
            type: "string",
            value: "",
            label: "Product Name"
        },
        warehouse: {
            type: "dropdown",
            value: "",
            label: "Warehouses"
        },
        categories: {
            type: "dropdown",
            value: "",
            label: "Categories"
        },
        productType: {
            type: "dropdown",
            value: "",
            label: "Product Type"
        },
        published: {
            type: "boolean",
            value: "",
            label: "Published"
        },
        manufacturers: {
            type: "dropdown",
            value: "",
            label: "Manufacturers"
        },
        vendor: {
            type: "string",
            value: "",
            label: "Vendor"
        },
        prdocutSKU: {
            type: "string",
            value: "",
            label: "SKU"
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
