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

export const getFilterCustomer = async (filter: FilterOrdersParam) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCustomer filter`, filter)

        let products
        const query = getParsedQuery(filter)

        //@ts-ignore
        products = (
            mongoose.models.Customer as Model<any, {}, {}, {}, any, any>
        ).find(query)

        if (products) return products
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getCustomerById = async (site: string, id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCustomer filter`)

        const parsedId = new Types.ObjectId(id)
        console.log(`getFilterCustomer filter`, parsedId)

        const customerInfo = await getProjectedQuery(
            mongoose.models.Customer as Model<any, {}, {}, {}, any, any>,
            { _id: parsedId, site },
            [],
            [
                "_id",
                "site",
                "email",
                "password",
                "firstName",
                "lastName",
                "fullName",
                "gender",
                "dateOfBirth",
                "companyName",
                "isTaxEmempt",
                "newsletter",
                "customerRoles",
                "vendorManager",
                "isActive",
                "adminComment",
                "registeredInStore",
                "ipAddress",
                "lastActivity",
                "orders",
                "address",
                "productShoppingCartIds",
                "productWishIds",
                "activityLog",
                "backInStock",
                "rewardPoints",
                "createdAt"
            ]
        )

        console.log(`[customer] info`, customerInfo)

        if (customerInfo?.[0]) return customerInfo?.[0]
        else return []
    } catch (err) {}
}
