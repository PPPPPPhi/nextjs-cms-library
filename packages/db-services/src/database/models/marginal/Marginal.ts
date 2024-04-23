import mongoose, { Model, Schema } from "mongoose"
import { IMarginal } from "./interface"

type MarginalModel = Model<IMarginal, {}, {}>

const marginalSchema = new mongoose.Schema<IMarginal, MarginalModel, {}>(
    {
        site: String,
        type: String,
        properties: Schema.Types.Mixed,
        language: String,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

// const marginalModel =
//     (mongoose.models.Marginal as MarginalModel) ||
//     mongoose.model("Marginal", marginalSchema)

export default marginalSchema
