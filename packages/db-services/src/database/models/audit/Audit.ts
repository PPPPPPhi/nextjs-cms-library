import mongoose, { Model, Types, Schema, Date } from "mongoose"
import { IAudit } from "./interface"

type AuditModel = Model<IAudit, {}, {}>

const auditSchema = new mongoose.Schema<IAudit, AuditModel, {}>(
    {
        dataId: { type: String, unique: true },
        user_fk: Types.ObjectId,
        category: String,
        action: Object
    },
    {
        timestamps: true
    }
)

const auditModel = mongoose.models.Audit || mongoose.model("Audit", auditSchema)

export default auditModel
