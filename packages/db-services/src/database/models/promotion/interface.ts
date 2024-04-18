import { Date } from "mongoose"

export interface IPromotion {
    promotion: string
    startDate: Date
    endDate: Date
    items: Array<string>
    promotionCode: string
    site: string
}
