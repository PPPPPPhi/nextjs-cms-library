import { Date } from "mongoose"
import {
    customerAddressType,
    customerActivityLogType,
    customerStoreType,
    customerRewardPointsType
} from "./type"
import { orderType } from "../order"

export interface ICustomer {
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
}