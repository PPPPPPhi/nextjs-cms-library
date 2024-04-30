// import Order from "../../database/models/order/Order"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator, getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import { multiSelectFilterField } from "../../../../admin-components/src/filter/utils"
import {
    FilterOrdersParam,
    QueryOperatior,
    getParsedQuery,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Model, Types } from "mongoose"
import { connectMongoDB } from "../.."

type createOrderType = {
    site: string
    description: string
    orderStatus: string
    paymentStatus: boolean
    customerId: string
    total: number
    remark: string
    pickUp: boolean
    orderAddress: Object
}

export const createOrder = async (f: createOrderType) => {
    const {
        description,
        orderStatus,
        paymentStatus,
        customerId,
        total,
        remark,
        pickUp,
        site,
        orderAddress
    } = f

    try {
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator
        const mongoose = await connectMongoDB()

        const newDocument = {
            description,
            orderStatus,
            paymentStatus,
            customerId,
            total,
            remark,
            pickUp,
            orderAddress,
            site
        }

        const create = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: name ?? "SYSTEM",
                id: operatorId,
                historyData: {
                    method: "createOrder",
                    event: "Register New Order"
                }
            },
            mongoose.models.Order as Model<any, {}, {}, {}, any, any>,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (create) return { message: "Success", status: 200 }
        else throw new Error("Error in Register New Order")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

// export const getOrder = async (site: string, type: string, lang: string) => {
//     try {
//         const mongoose = await connectMongoDB()
//         const marginals = await Order.findOne({ site, type, language: lang })

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

export const getFilterOrders = async (filter: FilterOrdersParam) => {
    try {
        console.log(`getFilterOrders filter`, filter)

        const mongoose = await connectMongoDB()

        const query = getParsedQuery(filter)

        const orders = await getProjectedQuery(
            mongoose.models.Order as Model<any, {}, {}, {}, any, any>,
            query,
            [],
            [
                "_id",
                "order",
                "orderStatus",
                "paymentStatus",
                "orderShipping",
                "customer",
                "store",
                "createdAt",
                "orderTotal"
            ]
        )

        if (orders) return orders
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getOrderById = async (site: string, id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCustomer filter`)

        const parsedId = new Types.ObjectId(id)

        const orderInfo = await getProjectedQuery(
            mongoose.models.Order as Model<any, {}, {}, {}, any, any>,
            { _id: parsedId, site },
            [],
            [
                "_id",
                "order",
                "createdAt",
                "customer",
                "orderStatus",
                "orderSubtotal",
                "orderShipping",
                "orderTax",
                "orderTotal",
                "profit",
                "paymentMethod",
                "paymentStatus",
                "store",
                "orderGUID",
                "customerIpAddress",
                "billingAndShipping",
                "products",
                "orderNotes"
            ]
        )

        if (orderInfo?.[0]) return orderInfo?.[0]
        else return []
    } catch (err) {}
}
