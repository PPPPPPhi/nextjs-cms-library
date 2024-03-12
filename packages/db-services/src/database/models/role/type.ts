import { Date } from "mongoose"

export type roleType = {
    name: string
    description: string
    functions: string[]
    sites: "*" | string[]
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
