export type orderType = {
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
    orderAddress: string
}
