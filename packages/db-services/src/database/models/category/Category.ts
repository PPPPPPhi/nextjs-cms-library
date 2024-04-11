import mongoose, { Model } from "mongoose"
import { ICategory } from "./interface"

type CategoryModal = Model<ICategory, {}, {}>

const categorySchema = new mongoose.Schema<ICategory, CategoryModal, {}>(
    {
        category: String,
        subCategory: String,
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps: true
    }
)

const CategoryModal =
    mongoose.models.Category || mongoose.model("Category", categorySchema)

export default CategoryModal
