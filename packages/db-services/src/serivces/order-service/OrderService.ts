import connectMongoDB from "../../database/connectMongoDB"
import Order from "../../database/models/order/Order"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator, getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import { multiSelectFilterField } from "../../../../admin-components/src/filter/utils"
import {
    FilterOrdersParam,
    QueryOperatior,
    getParsedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types } from "mongoose"

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
        await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

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
            Order,
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
//         await connectMongoDB()
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
        await connectMongoDB()
        console.log(`getFilterOrders filter`, filter)

        let orders
        const query = getParsedQuery(filter)

        console.log(`getFilterOrders query`, query)
        //@ts-ignore
        orders = Order.find(query)

        if (orders) return orders
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}
