import { Date } from "mongoose"

export interface IProduct {
    _id: string
    category: string
    product: string
    amount: string
    stock: string
    photo: string
}
