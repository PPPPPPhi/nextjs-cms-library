import { Date } from "mongoose"

export type siteType = {
    name: string
    slug: string
    description: string
    image: string
    status: number
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
