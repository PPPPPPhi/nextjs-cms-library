import mongoose, { Model, Schema } from "mongoose"
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
        site: String,
        orderAddress: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
)

export default orderSchema

// const orderModal = mongoose.models.Order || mongoose.model("Order", orderSchema)

// export default orderModal
