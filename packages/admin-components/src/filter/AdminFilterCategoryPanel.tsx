import {
    FilterSearchFieldsInterface,
    AdminFilterPanel
} from "./AdminFilterPanel"
import _ from "lodash"

interface FilterCategoryInterface {
    updateFilter: (filter: any) => Promise<void>
}

export const AdminFilterCategoryPanel: React.FC<FilterCategoryInterface> = ({
    updateFilter
}) => {
    const keyTypes = {
        catagory: {
            type: "string",
            value: "",
            label: "Category"
        },
        subCategory: {
            type: "string",
            value: "",
            label: "Sub Category"
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
