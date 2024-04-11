import { Date } from "mongoose"

export interface IPromotion {
    _id: string
    promotion: string
    startDate: Date
    endDate: Date
    items: Array<string>
    promotionCode: string
}
