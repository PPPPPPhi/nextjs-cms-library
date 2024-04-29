import { Types, Model } from "mongoose"
import { getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import {
    FilterOrdersParam,
    QueryOperatior,
    getPaginatedQuery,
    getParsedQuery,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { connectMongoDB } from "../.."

type createProductType = {
    site: string
    category: string
    product: string
    amount: string
    stock: string
    photo?: string
}

export const createCatelogProduct = async (f: createProductType) => {
    const { category, product, amount, stock, photo, site } = f

    try {
        const mongoose = await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const newDocument = {
            category,
            product,
            amount,
            stock,
            photo,
            site
        }

        const create = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: name ?? "SYSTEM",
                id: operatorId,
                historyData: {
                    method: "createCatelogProduct",
                    event: "Register New product"
                }
            },
            mongoose.models.Product as Model<any, {}, {}, {}, any, any>,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (create) return { message: "Success", status: 200 }
        else throw new Error("Error in register new product")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

// export const getCatelogProduct = async (site: string, type: string, lang: string) => {
//     try {
//         const mongoose = await connectMongoDB()
//         const marginals = await CatelogProduct.findOne({ site, type, language: lang })

//         return {
//             message: "Success",
//             status: 200,
//             marginals
//         }
//     } catch (error) {
//         console.log("Error occured when getting nav list", error)
//         return { message: "Failed", status: 500 }
//     }
// }

export const getFilterProducts = async (filter: FilterOrdersParam) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCatelogProducts filter`, filter)

        let products
        const query = getParsedQuery(filter)

        //@ts-ignore
        products = (
            mongoose.models.Product as Model<any, {}, {}, {}, any, any>
        ).find(query)

        if (products) return products
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getProductById = async (site: string, id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCustomer filter`)

        const parsedId = new Types.ObjectId(id)

        const productInfo = await getProjectedQuery(
            mongoose.models.Product as Model<any, {}, {}, {}, any, any>,
            { _id: parsedId, site },
            [],
            [
                "_id",
                "site",
                "productName",
                "shortDescription",
                "fullDescription",
                "sku",
                "categories",
                "manufacturers",
                "published",
                "productTags",
                "GTIN",
                "manufacturerPartNumber",
                "showOnHomePage",
                "displayOrder",
                "productType",
                "productTemplate",
                "visibleIndividually",
                "customerRoles",
                "limitedToStores",
                "vendor",
                "requireOtherProducts",
                "requiredProductIDs",
                "automaticallyAddTheseProductsToTheCart",
                "allowCustomerReviews",
                "availableStartDate",
                "availableEndDate",
                "markAsNew",
                "markAsNewStartDate",
                "markAsNewEndDate",
                "adminComment",
                "prices",
                "shipping",
                "inventory",
                "multimedia",
                "productAttributes",
                "specificationAttributes",
                "giftCard",
                "downloadableProduct",
                "rental",
                "recurringProduct",
                "SEO",
                "relatedProducts",
                "crossSells",
                "purchasedWithOrders",
                "stockQuantityHistory"
            ]
        )

        console.log(`product found`, productInfo?.[0])

        if (productInfo?.[0]) return productInfo?.[0]
        else return []
    } catch (err) {}
}
