import { Date } from "mongoose"

export interface IDocument {
    site: string
    relativePath: string
    isArchived: boolean
    name: string
    description: string
    size: number
    extension: string
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}
