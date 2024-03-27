import { Date } from "mongoose"

export type promotionType = {
    _id: string
    promotion: string
    startDate: Date
    endDate: Date
    items: Array<string>
    promotionCode: string
}
