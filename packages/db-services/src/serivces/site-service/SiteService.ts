import connectMongoDB from "@/db-services/database/connectMongoDB"
import Site from "@/db-services/database/models/site/Site"
import { getOperator } from "../auth-service/authService"
import { ErrorCode } from "@/db-services/constants/"
import {
    ImageResourceAdaptor,
    ImageResourceOperator
} from "@nextjs-cms-library/ui/index"

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
        const imageOperator = ImageResourceOperator.getInstance(imageApdator)
        const uploadImageReq = await imageOperator.uploadImage(image, slug)

        const operator = await getOperator()

        //@ts-ignore
        if (uploadImageReq?.data?.status === 500)
            throw new Error("Error returned from upload image")

        const site = new Site({
            name,
            slug,
            description,
            status: 1,
            image: `/${(image as File).name.replaceAll(" ", "_")}`,
            updatedBy: operator,
            createdBy: operator
        })

        await site.save()
        return { message: "Success", status: 200 }
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}
