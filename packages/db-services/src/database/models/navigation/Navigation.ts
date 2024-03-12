import mongoose, { Model, Schema } from "mongoose"
import { INavigation } from "./interface"

type NavigationModel = Model<INavigation, {}, {}>

const navigationSchema = new mongoose.Schema<INavigation, NavigationModel, {}>(
    {
        site: String,
        language: String,
        navJson: String,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

const navigationModel =
    mongoose.models.Navigation || mongoose.model("Navigation", navigationSchema)

export default navigationModel
