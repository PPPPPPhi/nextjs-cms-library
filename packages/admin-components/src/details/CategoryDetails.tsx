import { HiPencil } from "react-icons/hi"
import { ItemDetails } from "."
import _ from "lodash"
import { categoryType } from "@nextjs-cms-library/db-services/index"

interface CategoryDetailsInterface {
    value: categoryType | undefined
    readOnly?: boolean
    disabled?: boolean
    customWidth?: number
}

export const CategoryDetails: React.FC<CategoryDetailsInterface> = ({
    value,
    disabled,
    customWidth,
    readOnly = false
}) => {
    const {
        category,
        subCategory

        // origin = "NA",
        // expiryDate = new Date()
    } = value ?? {}
    const keyTypes = {
        category: {
            type: "string",
            value: category,
            label: "Category"
        },
        subCategory: {
            type: "string",
            value: subCategory,
            label: "Sub Category"
        }
    }

    const updateDetails = (data: any) => {
        return
    }

    return (
        <div className="d-flex align-items-center">
            {value && (
                <ItemDetails
                    keys={Object.keys(keyTypes)}
                    labels={Object.values(keyTypes).map((v: any) => v.label)}
                    types={Object.values(keyTypes).map((v: any) => v.type)}
                    values={value}
                    updateDetails={updateDetails}
                    readOnly={readOnly}
                />
            )}
        </div>
    )
}
