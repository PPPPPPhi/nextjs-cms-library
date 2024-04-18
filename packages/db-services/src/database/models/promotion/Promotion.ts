import mongoose, { Model } from "mongoose"
import { IPromotion } from "./interface"

type PromotionModal = Model<IPromotion, {}, {}>

const promotionSchema = new mongoose.Schema<IPromotion, PromotionModal, {}>(
    {
        promotion: String,
        startDate: Date,
        endDate: Date,
        items: Array<String>,
        promotionCode: String,
        site: String
    },
    {
        timestamps: true
    }
)

const promotionModal =
    mongoose.models.Promotion || mongoose.model("Promotion", promotionSchema)

export default promotionModal
