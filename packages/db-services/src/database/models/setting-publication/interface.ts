import { Date } from "mongoose"

export interface ISettingPublication {
    site: string
    properties: {
        [key: string]: [value: any]
    }
    settingVersion: String
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
