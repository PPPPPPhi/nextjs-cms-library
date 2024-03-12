import mongoose, { Model } from "mongoose"
import { IFunction } from "@/db-services/database/models/function/interface"

type FunctionModal = Model<IFunction, {}, {}>

const functionSchema = new mongoose.Schema<IFunction, FunctionModal, {}>(
    {
        name: String,
        description: String
    },
    {
        timestamps: true
    }
)

const functionModal =
    mongoose.models.Function || mongoose.model("Function", functionSchema)

export default functionModal
