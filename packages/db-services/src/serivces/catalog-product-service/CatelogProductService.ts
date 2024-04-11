import connectMongoDB from "../../database/connectMongoDB"
import Product from "../../database/models/product/Product"
import productModal from "../../database/models/product/Product"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator } from "../auth-service/authService"
import _ from "lodash"
import {
    FilterOrdersParam,
    PaginatedParam,
    getPaginatedQuery,
    getParsedQuery
} from "../utils"

type orderType = {
    name: string
    description: string
}

export const initializeFunction = async () => {
    try {
        await connectMongoDB()
        const defaultFunctions = RoleFunction.role

        //@ts-ignore
        const products = await Product.insertMany(defaultFunctions)
        return {
            message: "Success",
            status: 200,
            orderIds: products.map((l: any) => l._id)
        }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

export const createCatelogProduct = async (f: orderType) => {
    const { name, description } = f

    try {
        await connectMongoDB()

        const func = new productModal({
            name,
            description
        })

        await func.save()
        return { message: "Success", status: 200 }
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
