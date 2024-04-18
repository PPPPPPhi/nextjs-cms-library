import connectMongoDB from "../../database/connectMongoDB"
import Order from "../../database/models/order/Order"
import orderModal from "../../database/models/order/Order"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator } from "../auth-service/authService"
import _ from "lodash"
import { multiSelectFilterField } from "../../../../admin-components/src/filter/utils"
import { FilterOrdersParam, getParsedQuery } from "../utils"

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

        const func = new orderModal({
            description,
            orderStatus,
            paymentStatus,
            customerId,
            total,
            remark,
            pickUp,
            orderAddress,
            site
        })

        await func.save()
        return { message: "Success", status: 200 }
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
