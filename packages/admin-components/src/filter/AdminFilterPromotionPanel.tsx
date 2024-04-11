import {
    FilterSearchFieldsInterface,
    AdminFilterPanel
} from "./AdminFilterPanel"
import _ from "lodash"

interface FilterPromotionInterface {
    updateFilter: (filter: any) => Promise<void>
}

export const AdminFilterPromotionPanel: React.FC<FilterPromotionInterface> = ({
    updateFilter
}) => {
    const keyTypes = {
        promotion: {
            type: "string",
            value: "",
            label: "Promotion Name"
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
        items: {
            type: "string",
            value: "",
            label: "Included Items"
        },
        promotionCode: {
            type: "string",
            value: "",
            label: "Promotional Code"
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
