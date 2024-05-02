import { Date } from "mongoose"
import { productType } from "../product/type"
import { categoryType } from "../category/type"

export type discountRequirementsType = {
    discountRequirementType: string
    groupName: string
    requiredCustomerRole: string
}

export type disocuntAppliedToManufacturersType = {
    manufacturers: string
}

export type discountUsageHistoryType = {
    used: string
    order: string
    orderTotal: number
}

export type DiscountType = {
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
    requirements: discountRequirementsType
    appliedToProducts: productType[]
    appliedToCategories: categoryType[]
    appliedToManufacturers: disocuntAppliedToManufacturersType[]
    usageHistory: discountUsageHistoryType[]
}
