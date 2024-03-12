import { Date } from "mongoose"

export interface IImage {
    site: string
    relativePath: string
    isArchived: boolean
    name: string
    description: string
    size: number
    width: number
    height: number
    extension: string
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}
