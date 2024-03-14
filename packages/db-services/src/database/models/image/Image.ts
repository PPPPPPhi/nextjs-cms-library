import mongoose, { Model } from "mongoose"
import { IImage } from "./interface"

type ImageModel = Model<IImage, {}, {}>

const imageSchema = new mongoose.Schema<IImage, ImageModel, {}>(
    {
        site: String,
        relativePath: String,
        isArchived: Boolean,
        name: String,
        width: String,
        height: String,
        size: Number,
        description: String,
        extension: String,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

const imageModel = mongoose.models.Image || mongoose.model("Image", imageSchema)

export default imageModel
