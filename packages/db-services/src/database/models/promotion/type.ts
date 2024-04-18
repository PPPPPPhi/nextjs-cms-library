import { Date } from "mongoose"

export type promotionType = {
    promotion: string
    startDate: Date
    endDate: Date
    items: Array<string>
    promotionCode: string
    site: string
}
