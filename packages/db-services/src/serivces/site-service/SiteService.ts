import connectMongoDB from "../../database/connectMongoDB"
import Site from "../../database/models/site/Site"
import {
    getOperator,
    getOperatorId,
    getOperatorInfo
} from "../auth-service/authService"
import {
    ImageResourceAdaptor,
    ImageResourceOperator,
    imageResourceAdaptorType
} from "@nextjs-cms-library/ui/index"
import { QueryOperatior, getUpsertSingleDocumentQuery } from "../utils"

type createSiteType = {
    name: string
    slug: string
    image: File
    description: string
}

export const getAllSite = async () => {
    try {
        await connectMongoDB()

        //@ts-ignore
        const sites = await Site.find({})
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
        await connectMongoDB()

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
            updatedBy: operator,
            createdBy: operator
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
            Site,
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
