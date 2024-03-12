import { Date } from "mongoose"

export interface ISite {
    name: string
    slug: string
    description: string
    image: string
    status: number
    createdAt: Date
    updateDAt: Date
    createdBy: string
    updatedBy: string
}
