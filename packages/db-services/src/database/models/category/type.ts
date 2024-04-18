import { Date } from "mongoose"

export type categoryType = {
    category: string
    subCategory: string
    createdAt: Date
    updatedAt: Date
    site: string
}
