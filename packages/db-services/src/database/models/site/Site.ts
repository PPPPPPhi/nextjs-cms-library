import mongoose, { Model } from "mongoose"
import { ISite } from "./interface"

export type SiteModel = Model<ISite, {}, {}>

const siteSchema = new mongoose.Schema<ISite, SiteModel, {}>(
    {
        name: String,
        slug: { type: String, unique: true },
        image: String,
        description: String,
        status: Number,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

// const siteModel = mongoose.models.Site || mongoose.model("Site", siteSchema)

export default siteSchema
