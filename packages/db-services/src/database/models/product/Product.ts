import mongoose, { Model, Schema } from "mongoose"
import { IProduct } from "./interface"

type ProductModal = Model<IProduct, {}, {}>

const productSchema = new mongoose.Schema<IProduct, ProductModal, {}>(
    {
        site: String,
        productName: String,
        shortDescription: String,
        fullDescription: String,
        sku: String,
        categories: Array<String>,
        manufacturers: String,
        published: Boolean,
        productTags: Array<String>,
        GTIN: String,
        manufacturerPartNumber: String,
        showOnHomePage: Boolean,
        displayOrder: Number,
        productType: String,
        productTemplate: String,
        visibleIndividually: Boolean,
        customerRoles: Array<String>,
        limitedToStores: Array<String>,
        vendor: String,
        requireOtherProducts: Boolean,
        requiredProductIDs: Array<String>,
        automaticallyAddTheseProductsToTheCart: Boolean,
        allowCustomerReviews: Boolean,
        availableStartDate: Date,
        availableEndDate: Date,
        markAsNew: Boolean,
        markAsNewStartDate: Date,
        markAsNewEndDate: Date,
        adminComment: String,
        prices: Schema.Types.Mixed,
        shipping: Schema.Types.Mixed,
        inventory: Schema.Types.Mixed,
        multimedia: Schema.Types.Mixed,
        productAttributes: Schema.Types.Mixed,
        specificationAttributes: Schema.Types.Mixed,
        giftCard: Schema.Types.Mixed,
        downloadableProduct: Schema.Types.Mixed,
        rental: Schema.Types.Mixed,
        recurringProduct: Schema.Types.Mixed,
        SEO: Schema.Types.Mixed,
        relatedProducts: Array<Schema.Types.Mixed>,
        crossSells: Array<Schema.Types.Mixed>,
        purchasedWithOrders: Array<Schema.Types.Mixed>,
        stockQuantityHistory: Array<Schema.Types.Mixed>
    },
    {
        timestamps: true
    }
)

export default productSchema
