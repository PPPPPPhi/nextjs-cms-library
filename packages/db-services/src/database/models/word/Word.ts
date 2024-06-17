import mongoose, { Model, Schema } from "mongoose"
import { IWord } from "./interface"

type WordModel = Model<IWord, {}, {}>

const wordSchema = new mongoose.Schema<IWord, WordModel, {}>(
    {
        site: { type: String, unique: true },
        lang: String,
        createdBy: String,
        updatedBy: String,
        contents: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
)

export default wordSchema
