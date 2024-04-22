import connectMongoDB from "../../database/connectMongoDB"
import Image from "../../database/models/image/Image"
import { getOperator, getOperatorInfo } from "../auth-service/authService"
import { ObjectId } from "mongoose"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types } from "mongoose"

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
        await connectMongoDB()
        //@ts-ignore
        // const images = await Image.find({ site })

        const images = await getProjectedQuery(
            Image,
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
        await connectMongoDB()
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
            createdBy: operator,
            updatedBy: operator
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
            Image,
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
        await connectMongoDB()
        console.log(`[getImagesById] images`, id)
        //@ts-ignore
        const parseId = new Types.ObjectId(id)

        const images = await getProjectedQuery(
            Image,
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
        if (images?.[0]?._id) return images[0]
        else return []
    } catch (e) {
        console.log("Error in Getting Image", e)
        return null
    }
}
