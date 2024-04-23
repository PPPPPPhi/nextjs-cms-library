import mongoose, { Model, Types, Schema, Date } from "mongoose"
import { IAudit } from "./interface"

type AuditModel = Model<IAudit, {}, {}>

const auditSchema = new mongoose.Schema<IAudit, AuditModel, {}>(
    {
        dataId: { type: String },
        user: String,
        category: String,
        action: String,
        details: Object
    },
    {
        timestamps: true
    }
)

// const auditModel = mongoose.models.Audit || mongoose.model("Audit", auditSchema)

export default auditSchema
