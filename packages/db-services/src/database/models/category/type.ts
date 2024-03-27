import { Date } from "mongoose"

export type categoryType = {
    _id: string
    category: string
    subCategory: string
    createdAt: Date
    updatedAt: Date
}
