import mongoose, { Model } from "mongoose"
import { IFunction } from "./interface"

type FunctionModal = Model<IFunction, {}, {}>

const functionSchema = new mongoose.Schema<IFunction, FunctionModal, {}>(
    {
        name: { type: String, unique: true },
        description: String,
        functionId: Number
    },
    {
        timestamps: true
    }
)

const functionModal =
    mongoose.models.Function || mongoose.model("Function", functionSchema)

export default functionModal
