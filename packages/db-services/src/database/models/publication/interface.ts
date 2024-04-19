import { Date } from "mongoose"

export interface IPublication {
    name: string
    pageId: string
    pageVersion: string
    description: string
    language: string
    site: string
    slug: string
    status: boolean
    pagePageJson: string
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
