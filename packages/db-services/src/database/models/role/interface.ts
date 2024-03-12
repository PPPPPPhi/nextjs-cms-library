import { Date } from "mongoose"

export interface IRole {
    name: string
    description: string
    functions: string[]
    sites: "*" | string[]
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
