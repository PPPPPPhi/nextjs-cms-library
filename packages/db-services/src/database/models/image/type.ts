import { Date } from "mongoose"

export type imageType = {
    site: string
    relativePath: string
    isArchived: boolean
    name: string
    size: number
    width: number
    height: number
    description: string
    extension: string
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}
