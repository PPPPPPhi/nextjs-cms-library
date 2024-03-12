import { Date } from "mongoose"

export interface INavigation {
    site: string
    language: string
    navJson: string
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
