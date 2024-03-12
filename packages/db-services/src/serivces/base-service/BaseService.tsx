import connectMongoDB from "@/db-services/database/connectMongoDB"
import { Model } from "mongoose"
import * as _ from "lodash"

export const getSchemaHistory = async (
    Model: Model<any, {}, {}>,
    filter: any
) => {
    try {
        await connectMongoDB()

        const scheme = await Model.findOne(filter)

        const histories = await scheme.getVersions()
        const reformatted = histories.map((k: any) => {
            return {
                ...k.object,
                event: k.event,
                version: parseInt(k.version.split(".")[0])
            }
        })

        if (scheme)
            return {
                message: "Success",
                status: 200,
                histories: _.orderBy(reformatted ?? [], ["version"], ["desc"])
            }
        else throw new Error("Error in getting schema history")
    } catch (e) {
        console.log("Error in getting schema history", e)
        return { status: 500, message: "Failed" }
    }
}
