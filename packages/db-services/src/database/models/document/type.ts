import { Date } from "mongoose"

export type documentType = {
    site: string
    relativePath: string
    isArchived: boolean
    name: string
    size: number
    description: string
    extension: string
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}
