import { Date } from "mongoose"

export interface IPage {
    name: string
    description: string
    language: string
    site: string
    slug: string
    status: boolean
    pageJson: string
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
