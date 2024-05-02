import mongoose, { Model, Schema } from "mongoose"
import { IMarginalPublication } from "./interface"

type MarginalPublicationModel = Model<IMarginalPublication, {}, {}>

const marginalPublicationSchema = new mongoose.Schema<
    IMarginalPublication,
    MarginalPublicationModel,
    {}
>(
    {
        site: String,
        type: String,
        properties: Schema.Types.Mixed,
        language: String,
        marginalVersion: String,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

export default marginalPublicationSchema
