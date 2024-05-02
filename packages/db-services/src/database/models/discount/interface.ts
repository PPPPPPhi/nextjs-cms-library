import { Date } from "mongoose"
import { IProduct } from "../product/interface"
import { ICategory } from "../category/interface"

export type IDiscountRequirements = {
    discountRequirementType: string
    groupName: string
    requiredCustomerRole: string
}

export type IDisocuntAppliedToManufacturers = {
    manufacturers: string
}

export type IDiscountUsageHistory = {
    used: string
    order: string
    orderTotal: number
}

export type IDiscount = {
    isActive: boolean
    name: string
    discountType: string
    applyToSubcategories: boolean
    usePercentage: boolean
    discountPercentage: number
    maximumDiscountAmount: number
    requiresCouponCode: boolean
    couponCode: string
    urlWithCouponCode: string
    startDate: Date
    endDate: Date
    cumulativeWithOtherDiscounts: boolean
    discountLimitation: string
    nTimes: number
    maaximumDiscountedQuantity: number
    adminComment: string
    requirements: IDiscountRequirements
    appliedToProducts: IProduct[]
    appliedToCategories: ICategory[]
    appliedToManufacturers: IDisocuntAppliedToManufacturers[]
    usageHistory: IDiscountUsageHistory[]
}
