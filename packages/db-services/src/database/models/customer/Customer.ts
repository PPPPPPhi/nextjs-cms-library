import mongoose, { Model } from "mongoose"
import { ICustomer } from "./interface"

type CustomerModel = Model<ICustomer, {}, {}>

const customerSchema = new mongoose.Schema<ICustomer, CustomerModel, {}>(
    {
        site: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        fullName: String,
        gender: String,
        dateOfBirth: Date,
        companyName: String,
        isTaxEmempt: Boolean,
        newsletter: String,
        customerRoles: Array<String>,
        vendorManager: String,
        isActive: Boolean,
        adminComment: String,
        registeredInStore: String,
        ipAddress: String,
        lastActivity: Date,
        orderIds: Array<String>,
        address: Array<{
            firstName: String
            lastName: String
            email: String
            phoneNumber: String
            faxNumber: String
            address: String
        }>,
        productShoppingCartIds: Array<String>,
        productWishIds: Array<String>,
        activityLog: Array<{
            activityLogType: String
            ipAddress: String
            comment: String
            createdAt: Date
        }>,
        backInStock: Array<{
            store: String
            product: String
            subscribedOn: Date
        }>,
        rewardPoints: Array<{
            store: String
            points: Number
            pointsBalance: Number
            message: String
            date: Date
            endDate: Date
        }>
    },
    {
        timestamps: true
    }
)

// const CategoryModal =
//     mongoose.models.Category || mongoose.model("Category", categorySchema)

export default customerSchema
