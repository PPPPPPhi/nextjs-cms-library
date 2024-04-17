import { Date, ObjectId, Types } from "mongoose"

export interface IAudit {
    dataId: string
    user_fk: Types.ObjectId
    category: string
    action: Object
}
