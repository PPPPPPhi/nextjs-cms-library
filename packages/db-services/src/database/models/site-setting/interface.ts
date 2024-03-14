import { Date } from "mongoose"

export interface ISiteSetting {
    site: string
    properties: {
        [key: string]: any
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
