import mongoose, { Model, Schema } from "mongoose"
import { IOrder } from "./interface"

type OrderModal = Model<IOrder, {}, {}>

const orderSchema = new mongoose.Schema<IOrder, OrderModal, {}>(
    {
        site: String,
        order: String,
        createdAt: Date,
        customer: String,
        orderStatus: String,
        orderSubtotal: Number,
        shippingStatus: String,
        orderShipping: Number,
        orderTax: Number,
        orderTotal: Number,
        profit: Number,
        paymentMethod: String,
        paymentStatus: String,
        store: String,
        orderGUID: String,
        customerIpAddress: String,
        billingAndShipping: {
            billingAddress: {
                fullName: String,
                email: String,
                phone: Number,
                fax: String,
                company: String,
                address1: String,
                address2: String,
                city: String,
                countyRegion: String,
                stateProvince: String,
                zipPostalCode: String,
                country: String
            },
            shippingAddress: {
                fullName: String,
                email: String,
                phone: Number,
                fax: String,
                company: String,
                address1: String,
                address2: String,
                city: String,
                countyRegion: String,
                stateProvince: String,
                zipPostalCode: String,
                country: String
            },
            shippingMethod: String,
            shippingStatus: String
        },
        products: Schema.Types.Mixed,
        orderNotes: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
)

export default orderSchema

// const orderModal = mongoose.models.Order || mongoose.model("Order", orderSchema)

// export default orderModal
