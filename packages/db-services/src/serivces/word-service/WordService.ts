import { Model } from "mongoose"
import { connectMongoDB } from "../.."
import { wordType as WType } from "../.."

export const getSiteSetting = async (site: string, lang?: string) => {
    try {
        const mongoose = await connectMongoDB()

        const words = (await (
            mongoose.models.SiteSetting as Model<any, {}, {}, {}, any, any>
        ).findOne({ site, lang }, "-createdAt -createdBy")) as WType

        if (words) return words
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting", e)
        return null
    }
}
