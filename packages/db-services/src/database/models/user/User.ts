import mongoose, { Model } from "mongoose"
import { compare, hash } from "bcryptjs"
import { IUser, UserMethods } from "./interface"

type UserModel = Model<IUser, {}, UserMethods>

const userSchema = new mongoose.Schema<IUser, UserModel, UserMethods>(
    {
        userName: String,
        firstName: String,
        lastName: String,
        email: String,
        sites: [],
        roles: [],
        password: String,
        avator: String,
        status: Number,
        createdBy: String,
        updatedBy: String
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    const hashedPassword = await hash(this.password as string, 10)
    this.password = hashedPassword

    next()
})
// // checking if password is valid
userSchema.method(
    "isValidPassword",
    async function (password: string): Promise<boolean> {
        const isValid = await compare(password, this.password as string)
        return isValid
    }
)

const userModel = mongoose.models.User || mongoose.model("User", userSchema)

export default userModel
