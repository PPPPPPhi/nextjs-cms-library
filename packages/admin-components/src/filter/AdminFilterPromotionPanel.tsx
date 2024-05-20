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
        promotion: {
            type: "string",
            value: "",
            label: "Promotion Name"
        },
        couponCode: {
            type: "string",
            value: "",
            label: "Coupon Code"
        },
        discountType: {
            type: "dropdown",
            value: "",
            label: "Discount Type"
        },
        isActive: {
            type: "dropdown",
            value: "",
            label: "Is Active"
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
