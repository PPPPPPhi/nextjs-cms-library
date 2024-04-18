import { Date, ObjectId, Types, Schema } from "mongoose"

export type auditType = {
    dataId: string
    user: string
    category: string
    action: string
    details: Object
}
