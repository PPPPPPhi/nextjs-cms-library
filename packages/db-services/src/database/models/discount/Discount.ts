import mongoose, { Model, Schema } from "mongoose"
import { IDiscount } from "./interface"

type DiscountModal = Model<IDiscount, {}, {}>

const discountSchema = new mongoose.Schema<IDiscount, DiscountModal, {}>(
    {
        isActive: Boolean,
        name: String,
        discountType: String,
        applyToSubcategories: Boolean,
        usePercentage: Boolean,
        discountPercentage: Number,
        maximumDiscountAmount: Number,
        requiresCouponCode: Boolean,
        couponCode: String,
        urlWithCouponCode: String,
        startDate: Date,
        endDate: Date,
        cumulativeWithOtherDiscounts: Boolean,
        discountLimitation: String,
        nTimes: Number,
        maaximumDiscountedQuantity: Number,
        adminComment: String,
        requirements: {
            discountRequirementType: String,
            groupName: String,
            requiredCustomerRole: String
        },
        appliedToProducts: Schema.Types.Mixed,
        appliedToCategories: Schema.Types.Mixed,
        appliedToManufacturers: Schema.Types.Mixed,
        usageHistory: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
)

export default discountSchema
