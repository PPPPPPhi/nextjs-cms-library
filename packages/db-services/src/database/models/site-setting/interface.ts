import { Date } from "mongoose"

export interface ISiteSetting {
    site: string
    properties: {
        [key: string]: [value: any]
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
