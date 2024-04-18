import { Date } from "mongoose"

export interface ICategory {
    category: string
    subCategory: string
    createdAt: Date
    updatedAt: Date
    site: string
}
