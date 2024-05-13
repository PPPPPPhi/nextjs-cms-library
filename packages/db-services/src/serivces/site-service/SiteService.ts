import { Model } from "mongoose"
import { getOperatorInfo } from "../auth-service/authService"
import {
    ImageResourceAdaptor,
    ImageResourceOperator,
    imageResourceAdaptorType
} from "@nextjs-cms-library/ui/index"
import { QueryOperatior, getUpsertSingleDocumentQuery } from "../utils"
import { connectMongoDB } from "../.."

type createSiteType = {
    name: string
    slug: string
    image: File
    description: string
}
export const getAllSite = async () => {
    try {
        const mongoose = await connectMongoDB()
        const sites = await (
            mongoose.models.Site as Model<any, {}, {}, {}, any, any>
        ).find({})
        if (sites) return sites
        else return []
    } catch (e) {
        console.log("Error in Getting all sites", e)
        return e
    }
}

export const createSite = async (siteReq: createSiteType) => {
    const { name, slug, image, description } = siteReq ?? {}

    try {
        const mongoose = await connectMongoDB()

        const imageApdator = new ImageResourceAdaptor()
        const imageOperator = ImageResourceOperator.getInstance(
            imageApdator as imageResourceAdaptorType
        )
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const newDocument = {
            name,
            slug,
            description,
            status: 1,
            image: image,
            updatedBy: operatorName,
            createdBy: operatorName
        }

        const createRes = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "createSite",
                    event: "Create New Site"
                }
            },
            mongoose.models.Site as Model<any, {}, {}, {}, any, any>,
            { slug: slug },
            newDocument
        )

        if (createRes) return { message: "Success", status: 200 }
        else throw new Error("Error in register new user")
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}

export const updateSite = async (site: string, name: string) => {
    try {
        const mongoose = await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        console.log(`updateSite`, site, name)

        const findOne = await (
            mongoose.models.Site as Model<any, {}, {}, {}, any, any>
        ).findOne({
            slug: site
        })

        console.log(`updateSite findOne`, findOne)

        const res = await (
            mongoose.models.Site as Model<any, {}, {}, {}, any, any>
        ).findOneAndUpdate(
            { slug: site },
            { name },
            {
                new: true
            }
        )

        console.log(`updateSite res`, res)

        if (res) return { message: "Success", status: 200 }
        else throw new Error("Error in register new user")
    } catch (e) {
        console.log("Error in updating site", e)
        return { message: "Fail", status: 500 }
    }
}
