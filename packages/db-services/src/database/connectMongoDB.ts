import mongoose, { mongo } from "mongoose"
//@ts-ignore
import MongooseHistoryPlugin from "mongoose-history-plugin"

import orderSchema from "./models/order/Order"
import userSchema from "./models/user/User"
import siteSettingSchema from "./models/site-setting/SiteSetting"
import siteSchema from "./models/site/Site"
import settingPublicationSchema from "./models/setting-publication/SettingPublication"
import roleSchema from "./models/role/Role"
import publicationSchema from "./models/publication/Publication"
import promotionSchema from "./models/promotion/Promotion"
import productSchema from "./models/product/Product"
import pageSchema from "./models/page/Page"
import marginalSchema from "./models/marginal/Marginal"
import imageSchema from "./models/image/Image"
import functionSchema from "./models/function/Function"
import categorySchema from "./models/category/Category"
import auditSchema from "./models/audit/Audit"

declare global {
    var mongoose: any // This must be a `var` and not a `let / const`
}

const historyOptions = {
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
    modelName: "siteSetting_histories", // Name of the collection for the histories
    embeddedDocument: false, // Is this a sub document
    embeddedModelName: "", // Name of model if used with embedded document
    ignorePopulatedFields: false
}

const DATABASE_URL = process.env.DATABASE_URL as string

if (!DATABASE_URL) {
    throw new Error(
        "Please define the DATABASE_URL environment variable inside .env"
    )
}

let cached = global.mongoose

if (!cached) {
    console.log("not cached 1")
    cached = global.mongoose = { conn: null, promise: null }
}

export const connectMongoDB = async () => {
    if (cached.conn) {
        console.log("not cached 2")

        return cached.conn
    }

    if (!cached.promise) {
        let options = {
            bufferCommands: false,
            minPoolSize: 20,
            socketTimeoutMS: 30000,
            serverSelectionTimeoutMS: 30000,
            maxPoolSize: 50
        }

        console.log("not cached 3")

        cached.promise = mongoose
            .connect(DATABASE_URL, options)
            .then((mongoose) => {
                mongoose.model("User", userSchema)
                mongoose.model(
                    "SiteSetting",
                    siteSettingSchema.plugin(
                        MongooseHistoryPlugin({
                            ...historyOptions,
                            mongoose,
                            modelName: "siteSetting_histories"
                        })
                    )
                )
                mongoose.model("Site", siteSchema)
                mongoose.model(
                    "SettingPublicaiton",
                    settingPublicationSchema.plugin(
                        MongooseHistoryPlugin({
                            ...historyOptions,
                            mongoose,
                            modelName: "settingPublication_histories"
                        })
                    )
                )
                mongoose.model("Role", roleSchema)
                mongoose.model(
                    "Publication",
                    publicationSchema.plugin(
                        MongooseHistoryPlugin({
                            ...historyOptions,
                            mongoose,
                            modelName: "publication_histories"
                        })
                    )
                )
                mongoose.model("Promotion", promotionSchema)
                mongoose.model("Product", productSchema)
                mongoose.model(
                    "Page",
                    pageSchema.plugin(
                        MongooseHistoryPlugin({
                            ...historyOptions,
                            mongoose,
                            modelName: "page_histories"
                        })
                    )
                )
                mongoose.model("Order", orderSchema)
                mongoose.model("Marginal", marginalSchema)
                mongoose.model("Image", imageSchema)
                mongoose.model("Function", functionSchema)
                mongoose.model("Category", categorySchema)
                mongoose.model("Audit", auditSchema)
                return mongoose
            })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

// process.on("SIGINT", async () => {
//     await mongoose.connection.close()
//     process.exit(0)
// })
