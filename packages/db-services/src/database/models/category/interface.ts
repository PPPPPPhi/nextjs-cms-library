import { Date } from "mongoose"

export interface ICategory {
    _id: string
    category: string
    subCategory: string
    createdAt: Date
    updatedAt: Date
}
