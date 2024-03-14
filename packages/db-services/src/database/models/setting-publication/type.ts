import { Date } from "mongoose"
import { historySchemaType } from "../../../types"

export type settingPublicationType = {
    _id: string
    site: string
    properties: {
        [key: string]: [value: any]
    }
    settingVersion: String
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
} & historySchemaType<{
    _id: string
    site: string
    properties: {
        [key: string]: [value: any]
    }
    settingVersion: String
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}>
