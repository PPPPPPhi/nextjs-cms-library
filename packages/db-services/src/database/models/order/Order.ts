import mongoose, { Model } from "mongoose"
import { IOrder } from "./interface"

type OrderModal = Model<IOrder, {}, {}>

const orderSchema = new mongoose.Schema<IOrder, OrderModal, {}>(
    {
        description: String,
        createdAt: Date,
        updatedAt: Date,
        orderStatus: String,
        paymentStatus: Boolean,
        customerId: String,
        total: Number,
        remark: String,
        pickUp: Boolean,
        orderAddress: String
    },
    {
        timestamps: true
    }
)

const orderModal = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default orderModal
