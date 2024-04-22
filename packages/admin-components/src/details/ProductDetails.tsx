import { HiPencil } from "react-icons/hi"
import { productType } from "../../../db-services/src/database/models/product/type"
import { ItemDetails } from "."
import _ from "lodash"

interface ProductDetailsInterface {
    value: productType | undefined
    readOnly?: boolean
    disabled?: boolean
    customWidth?: number
}

export const ProductDetails: React.FC<ProductDetailsInterface> = ({
    value,
    disabled,
    customWidth,
    readOnly = false
}) => {
    const {
        category,
        product,
        photo,
        amount,
        stock
        // origin = "NA",
        // expiryDate = new Date()
    } = value ?? {}
    const keyTypes = {
        category: {
            type: "string",
            value: category,
            label: "Category"
        },
        product: {
            type: "string",
            value: product,
            label: "Product Name"
        },
        photo: {
            type: "photo",
            value: photo,
            label: "Product Photo"
        },
        amount: {
            type: "number",
            value: amount,
            label: "Amount"
        },
        stock: {
            type: "number",
            value: stock,
            label: "Stock"
        },
        origin: {
            type: "string",
            value: "NA", //origin,
            label: "Product Origin"
        },
        expiryDate: {
            type: "date",
            value: new Date(), //expiryDate,
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
