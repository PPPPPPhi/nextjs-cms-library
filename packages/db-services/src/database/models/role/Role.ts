import mongoose, { Model, ObjectId, Schema } from "mongoose"
import { IRole } from "./interface"
import { siteType } from "../site/type"

type RoleModel = Model<IRole, {}, {}>

const roleSchema = new mongoose.Schema<IRole, RoleModel, {}>(
    {
        name: String,
        description: String,
        functions_lookUp: Array<Schema.Types.Mixed>,
        sites: Array<String>,
        userIds: Array<ObjectId>,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

const roleModel = mongoose.models.Role || mongoose.model("Role", roleSchema)

export default roleModel
