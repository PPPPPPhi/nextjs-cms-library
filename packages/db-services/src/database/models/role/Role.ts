import mongoose, { Model, ObjectId, Schema } from "mongoose"
import { IRole } from "@/db-services/database/models/role/interface"
import { siteType } from "../site/type"

type RoleModel = Model<IRole, {}, {}>

const roleSchema = new mongoose.Schema<IRole, RoleModel, {}>(
    {
        name: String,
        description: String,
        functions: Array<ObjectId>,
        sites: Schema.Types.Mixed,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

const roleModel = mongoose.models.Role || mongoose.model("Role", roleSchema)

export default roleModel
