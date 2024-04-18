import { Date, ObjectId, Types, Schema } from "mongoose"

export interface IAudit {
    dataId: String
    user: String
    category: string
    action: string
    details: Object
}
