import mongoose, { Model, Date } from "mongoose"
import { IProduct } from "./interface"

type ProductModal = Model<IProduct, {}, {}>

const productSchema = new mongoose.Schema<IProduct, ProductModal, {}>(
    {
        category: String,
        product: String,
        amount: String,
        stock: String,
        photo: String,
        site: String
    },
    {
        timestamps: true
    }
)

const ProductModal =
    mongoose.models.Product || mongoose.model("Product", productSchema)

export default ProductModal
