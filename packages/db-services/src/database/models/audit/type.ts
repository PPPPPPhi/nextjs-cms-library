import { Date, ObjectId } from "mongoose"

export type auditType = {
    dataId: string
    user: string
    category: string
    action: Object
}
