import connectMongoDB from "../../database/connectMongoDB"
import Product from "../../database/models/product/Product"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import {
    FilterOrdersParam,
    QueryOperatior,
    getPaginatedQuery,
    getParsedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types } from "mongoose"

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
        await connectMongoDB()
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
            Product,
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
//         await connectMongoDB()
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
        await connectMongoDB()
        console.log(`getFilterCatelogProducts filter`, filter)

        let orders
        const query = getParsedQuery(filter)
        const res = getPaginatedQuery(
            Product,
            {
                pageSize: filter?.pageSize,
                pageNum: filter?.pageNum
            },
            query,
            null
        )

        console.log(`getFilterCatelogProducts query`, query)
        //@ts-ignore
        // orders = Product.find(query)
        orders = res

        if (orders) return orders
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}
