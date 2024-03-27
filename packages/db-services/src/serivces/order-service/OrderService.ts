import connectMongoDB from "../../database/connectMongoDB"
import Order from "../../database/models/order/Order"
import orderModal from "../../database/models/order/Order"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator } from "../auth-service/authService"
import _ from "lodash"

type orderType = {
    name: string
    description: string
}

export const initializeFunction = async () => {
    try {
        await connectMongoDB()
        const defaultFunctions = RoleFunction.role

        //@ts-ignore
        const orders = await Order.insertMany(defaultFunctions)
        return {
            message: "Success",
            status: 200,
            orderIds: orders.map((l) => l._id)
        }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

export const createOrder = async (f: orderType) => {
    const { name, description } = f

    try {
        await connectMongoDB()

        const func = new orderModal({
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

type FilterDateRange = {
    $gte: Date
    $lte: Date
}

type FilterOrdersParam = {
    description?: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
    orderStatus?: string | undefined
    paymentStatus?: string | undefined
    customerId?: string | undefined
    total?: string | undefined
    remark?: string | undefined
    pickUp?: string | undefined
    orderAddress?: string | undefined
}

export const getFilterOrders = async (filter: FilterOrdersParam) => {
    try {
        await connectMongoDB()
        console.log(`getFilterOrders filter`, filter)

        let orders

        if (filter?.startDate && filter?.endDate) {
            console.log(`getFilterOrders check date`)

            console.log(`mongoose order`, Order)
            const filterClone = _.cloneDeep(filter)
            _.unset(filterClone, `startDate`)
            _.unset(filterClone, `endDate`)

            const query = {
                ...filterClone,
                createdAt: {
                    $gte: new Date(filter?.startDate),
                    $lte: new Date(filter?.endDate)
                }
            }

            console.log(`getFilterOrders query with time`, query)

            // @ts-ignore
            orders = Order.find(query)
        } else {
            console.log(`getFilterOrders query`, filter)
            //@ts-ignore
            orders = Order.find(filter)
        }

        if (orders) return orders
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}
