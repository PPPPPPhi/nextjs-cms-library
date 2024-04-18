import mongoose, { Model } from "mongoose"
//@ts-ignore
import MongooseHistoryPlugin from "mongoose-history-plugin"
import { IPublication } from "./interface"

type PublicationModel = Model<IPublication, {}, {}>

const publicationSchema = new mongoose.Schema<
    IPublication,
    PublicationModel,
    {}
>(
    {
        name: String,
        description: String,
        language: String,
        pageId: String,
        pageVersion: String,
        siteSlug: String,
        slug: String,
        status: Number,
        pagePageJson: String,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

let options = {
    mongoose: mongoose, // A mongoose instance
    userCollection: "User", // Colletcion to ref when you pass an user id
    userCollectionIdType: false, // Type for user collection ref id, defaults to ObjectId
    accountCollection: "accounts", // Collection to ref when you pass an account id or the item has an account property
    accountCollectionIdType: false, // Type for account collection ref id, defaults to ObjectId
    userFieldName: "user", // Name of the property for the user
    accountFieldName: "account", // Name of the property of the account if any
    timestampFieldName: "timestamp", // Name of the property of the timestamp
    methodFieldName: "method", // Name of the property of the method
    collectionIdType: false, // Cast type for _id (support for other binary types like uuid) defaults to ObjectId
    ignore: [], // List of fields to ignore when compare changes
    noDiffSave: false, // If true save event even if there are no changes
    noDiffSaveOnMethods: ["delete"], // If a method is in this list, it saves history even if there is no diff.
    noEventSave: true, // If false save only when __history property is passed
    modelName: "publication_histories", // Name of the collection for the histories
    embeddedDocument: false, // Is this a sub document
    embeddedModelName: "", // Name of model if used with embedded document

    // If true save only the _id of the populated fields
    // If false save the whole object of the populated fields
    // If false and a populated field property changes it triggers a new history
    // You need to populate the field after a change is made on the original document or it will not catch the differences
    ignorePopulatedFields: false
}

const publicationModel =
    mongoose.models.Publication ||
    mongoose.model(
        "Publication",
        publicationSchema.plugin(MongooseHistoryPlugin(options))
    )

export default publicationModel
