import { Date, ObjectId, Types } from "mongoose"

export type auditType = {
    dataId: string
    user_fk: Types.ObjectId
    category: string
    action: Object
}
