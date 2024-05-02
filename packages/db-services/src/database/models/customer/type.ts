import { orderType } from "../order/type"

export type customerAddressType = {
    firstName: string
    lastName: string
    email: string
    phonenumber: string
    faxnumber: string
    address: string
}

export type customerActivityLogType = {
    activityLogType: string
    ipAddress: string
    comment: string
    createdAt: string
}

export type customerStoreType = {
    store: string
    product: string
    subscribedOn: string
}

export type customerRewardPointsType = {
    store: string
    points: number
    pointsBalance: number
    message: string
    date: string
    endstring: string
}

export type CustomerType = {
    _id: string
    site: string
    email: string
    password: string
    firstName: string
    lastName: string
    fullName: string
    gender: string
    dateOfBirth: string
    companyName: string
    isTaxEmempt: boolean
    newsletter: string
    customerRoles: string[]
    vendorManager: string
    isActive: boolean
    adminComment: string
    registeredInStore: string
    ipAddress: string
    lastActivity: string
    orders: orderType[]
    address: customerAddressType[]
    productShoppingCartIds: string[]
    productWishIds: string[]
    activityLog: customerActivityLogType[]
    backInStock: customerStoreType[]
    rewardPoints: customerRewardPointsType[]
    createdAt: string
}
