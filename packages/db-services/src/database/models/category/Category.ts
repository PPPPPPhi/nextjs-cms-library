import mongoose, { Model, Schema } from "mongoose"
import { ICategory } from "./interface"

type CategoryModal = Model<ICategory, {}, {}>

const categorySchema = new mongoose.Schema<ICategory, CategoryModal, {}>(
    {
        site: String,
        name: String,
        description: String,
        parentCategory: String,
        picture: String,
        display: Schema.Types.Mixed,
        mappings: Schema.Types.Mixed,
        SEO: Schema.Types.Mixed,
        products: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
)

export default categorySchema
