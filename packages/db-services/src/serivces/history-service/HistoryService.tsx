import connectMongoDB from "../../database/connectMongoDB"
import { getOperator, getOperatorId } from "../auth-service/authService"

import { Model } from "mongoose"
import * as _ from "lodash"

export const getFullVersion = (version: string) => {
    return version !== "undefined" ? `${version}.0.0` : undefined
}

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

export const publicateSchema = async (
    source: any,
    Model: Model<any, {}, {}>,
    event: string,
    method: string,
    publication?: any
) => {
    try {
        const operator = await getOperator()
        const operatorId = await getOperatorId()

        const historyRecord = {
            __history: {
                event,
                user: operatorId, // An object id of the user that generate the event
                reason: undefined,
                data: undefined, // Additional data to save with the event
                type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                method
            }
        }

        if (!publication) {
            const newPublication = new Model({
                ...source,
                createdBy: operator,
                updatedBy: operator,
                __history: historyRecord.__history
            })
            await newPublication.save()
        } else {
            const { createdAt } = publication

            Object.keys(source).forEach((l) => {
                publication[l] = source[l]
            })

            publication.createdAt = createdAt
            publication.__history = historyRecord.__history

            await publication.save()
        }

        return { message: "Success", status: 200 }
    } catch (e) {
        console.log("Error in publishing schema history", e)
        return { message: "Fail", status: 500 }
    }
}
