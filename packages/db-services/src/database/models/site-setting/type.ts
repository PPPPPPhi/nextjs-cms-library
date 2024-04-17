import { Date } from "mongoose"
import { historySchemaType } from "../../../types"

export type siteSettingType = {
    _id: string
    siteSlug: string
    properties: {
        [key: string]: [value: any]
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
    _doc: any
} & historySchemaType<{
    _id: string
    siteSlug: string
    properties: {
        [key: string]: [value: any]
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}>
