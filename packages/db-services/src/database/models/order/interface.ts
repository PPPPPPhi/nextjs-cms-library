import { Date } from "mongoose"

export interface IOrder {
    _id: string
    description: string
    createdAt: Date
    updatedAt: Date
    orderStatus: string
    paymentStatus: boolean
    customerId: string
    total: number
    remark: string
    pickUp: boolean
    site: string
    orderAddress: {
        [key: string]: [value: any]
    }
}
