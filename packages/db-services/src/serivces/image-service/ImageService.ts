import connectMongoDB from "@/db-services/database/connectMongoDB"
import Image from "@/db-services/database/models/image/Image"
import { getOperator } from "../auth-service/authService"
import { ErrorCode } from "@/db-services/constants/"
import { ObjectId } from "mongoose"

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
        const images = await Image.find({ site })

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
        const operator = await getOperator()

        const image = new Image({
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
        })

        await image.save()
        return { message: "Success", status: 200 }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getImagesById = async (id: ObjectId) => {
    try {
        await connectMongoDB()
        console.log(`[getImagesById] images`, id)
        const images = await Image.find({ _id: id })
        console.log(`[getImagesById] images`, images)
        if (images) return images
        else return []
    } catch (e) {
        console.log("Error in Getting Image", e)
        return null
    }
}
