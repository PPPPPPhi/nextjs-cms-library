import { Date } from "mongoose"

export interface ISiteSetting {
    siteSlug: string
    properties: {
        [key: string]: any
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
