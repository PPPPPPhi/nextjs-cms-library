import mongoose, { Model, Schema } from "mongoose"
import { ISettingPublication } from "./interface"

type settingPublicationModel = Model<ISettingPublication, {}, {}>

const settingPublicationSchema = new mongoose.Schema<
    ISettingPublication,
    settingPublicationModel,
    {}
>(
    {
        site: String,
        settingVersion: String,
        createdBy: String,
        updatedBy: String,
        properties: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
)

// const settingPublicationModel =
//     (mongoose.models.SettingPublicaiton as settingPublicationModel) ||
//     mongoose.model(
//         "SettingPublicaiton",
//         settingPublicationSchema.plugin(MongooseHistoryPlugin(options))
//     )

export default settingPublicationSchema
