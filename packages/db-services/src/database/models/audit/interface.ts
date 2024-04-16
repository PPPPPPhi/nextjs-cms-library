import { Date, ObjectId } from "mongoose"

export interface IAudit {
    dataId: string
    user: string
    category: string
    action: Object
}
