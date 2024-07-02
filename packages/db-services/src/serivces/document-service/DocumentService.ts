import { getOperatorInfo } from "../auth-service/authService"
import { Model } from "mongoose"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types } from "mongoose"
import { connectMongoDB } from "../.."

type documentType = {
    site: string
    fileName: string
    fileSize: number
    fileExtension: string
}

export const saveDocumentBySite = async (doc: documentType) => {
    const { site, fileName, fileSize, fileExtension } = doc

    try {
        const mongoose = await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const newDocument = {
            site,
            relativePath: `/${fileName}`,
            isArchived: false,
            name: fileName,
            size: fileSize,
            description: "No description yet",
            extension: fileExtension,
            createdBy: operatorName,
            updatedBy: operatorName
        }

        const createDocument = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "saveDocumentBySite",
                    event: "Save Document By Site"
                }
            },
            mongoose.models.Document as Model<any, {}, {}, {}, any, any>,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (createDocument) return { status: 200 }
        else throw new Error("Error in register new user")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getDocumentById = async (id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`[getImagesById] images`, id)
        //@ts-ignore
        const parseId = new Types.ObjectId(id)

        const doc = await getProjectedQuery(
            mongoose.models.Document as Model<any, {}, {}, {}, any, any>,
            { _id: parseId },
            [],
            [
                "_id",
                "site",
                "relativePath",
                "isArchived",
                "name",
                "size",
                "description",
                "extension",
                "createdBy",
                "updatedBy"
            ],
            []
        )

        console.log(`[getImagesById] images`, doc)
        if (doc?.length != 0) return doc
        else throw new Error("Error in getting image by id")
    } catch (e) {
        console.log("Error in Getting Image", e)
        return null
    }
}
