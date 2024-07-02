import mongoose, { Model } from "mongoose"
import { IDocument } from "./interface"

type DocumentModel = Model<IDocument, {}, {}>

const documentSchema = new mongoose.Schema<IDocument, DocumentModel, {}>(
    {
        site: String,
        relativePath: String,
        isArchived: Boolean,
        name: String,
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

export default documentSchema
