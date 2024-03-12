import { Date } from "mongoose"
import { historySchemaType } from "@/db-services/types"

export type siteSettingType = {
    _id: string
    site: string
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
    site: string
    properties: {
        [key: string]: [value: any]
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}>
