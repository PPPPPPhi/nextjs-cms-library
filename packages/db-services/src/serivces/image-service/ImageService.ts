import { getOperatorInfo } from "../auth-service/authService"
import { Model } from "mongoose"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types } from "mongoose"
import { connectMongoDB } from "../.."

type imageType = {
    site: string
    fileName: string
    fileSize: number
    width: number
    height: number
    fileExtension: string
}

export const getImagesBySite = async (site: string) => {
    try {
        const mongoose = await connectMongoDB()
        //@ts-ignore
        // const images = await Image.find({ site })

        const images = await getProjectedQuery(
            mongoose.models.Image as Model<any, {}, {}, {}, any, any>,
            { site },
            [],
            [
                "_id",
                "site",
                "relativePath",
                "isArchived",
                "name",
                "width",
                "height",
                "size",
                "description",
                "extension",
                "createdBy",
                "updatedBy"
            ],
            []
        )

        console.log(`[image] images`, images)

        if (images) return images
        else return []
    } catch (e) {
        console.log("Error in Getting Image", e)
        return null
    }
}

export const saveImageBySite = async (image: imageType) => {
    const { site, fileName, fileSize, width, height, fileExtension } = image

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
            width,
            height,
            extension: fileExtension,
            createdBy: operatorName,
            updatedBy: operatorName
        }

        const createImage = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "registerUserByForm",
                    event: "Register New User"
                }
            },
            mongoose.models.Image as Model<any, {}, {}, {}, any, any>,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (createImage) return { status: 200 }
        else throw new Error("Error in register new user")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getImagesById = async (id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`[getImagesById] images`, id)
        //@ts-ignore
        const parseId = new Types.ObjectId(id)

        const images = await getProjectedQuery(
            mongoose.models.Image as Model<any, {}, {}, {}, any, any>,
            { _id: parseId },
            [],
            [
                "_id",
                "site",
                "relativePath",
                "isArchived",
                "name",
                "width",
                "height",
                "size",
                "description",
                "extension",
                "createdBy",
                "updatedBy"
            ],
            []
        )

        console.log(`[getImagesById] images`, images)
        if (images?.length != 0) return images
        else throw new Error("Error in getting image by id")
    } catch (e) {
        console.log("Error in Getting Image", e)
        return null
    }
}
