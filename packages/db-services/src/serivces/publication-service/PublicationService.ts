import connectMongoDB from "@/db-services/database/connectMongoDB"
import Publication from "@/db-services/database/models/publication/Publication"
import { getOperator, getOperatorId } from "../auth-service/authService"
import { Schema } from "mongoose"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import { getPageById } from "../page-service/PageService"
import publicationModel from "@/db-services/database/models/publication/Publication"
import * as _ from "lodash"
import { HistoryService } from "../../"

export const publishPage = async (pageId: string, version?: string) => {
    try {
        await connectMongoDB()

        const operator = await getOperator()
        const operatorId = await getOperatorId()

        const versionHistory = `${version}.0.0`

        const page = await getPageById(pageId, version && versionHistory)
        const publication = await getPublicationByPageId(pageId)

        const pageHistoryRecorder = {
            __history: {
                event: "Publish Page",
                user: operatorId, // An object id of the user that generate the event
                reason: undefined,
                data: undefined, // Additional data to save with the event
                type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                method: "publish page" // Optional and intended for method reference
            }
        }

        if (page) {
            const {
                name,
                slug,
                description,
                language,
                pageJson,
                site,
                pageVersion
            } = page

            if (!publication) {
                const newPublication = new Publication({
                    name,
                    slug,
                    description,
                    language,
                    pageJson,
                    site,
                    createdBy: operator,
                    updatedBy: operator,
                    pageId,
                    pageVersion,
                    status: 1,
                    __history: pageHistoryRecorder.__history
                })
                await newPublication.save()
                return { message: "Success", status: 200 }
            } else {
                const { createdAt } = publication
                publication.createdAt = createdAt
                publication.pageVersion = versionHistory
                publication.pageJson = pageJson
                publication.__history = pageHistoryRecorder.__history

                await publication.save()
                return { message: "Success", status: 200 }
            }
        }
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}

export const getPublicationByPageId = async (pageId: string) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const publicaiton = await Publication.findOne({ pageId })

        if (publicaiton._id) return publicaiton
        else throw new Error("No publicaiton yet")
    } catch (e) {
        console.log("Error in getting publicaiton", e)
        return null
    }
}

export const getPublicationList = async (site: string) => {
    try {
        await connectMongoDB()

        const siteSettingResp = getSiteSettingByKey(site, "cms_language")
        const publicationResp = Publication.aggregate([
            { $match: { site } },
            { $group: { _id: "$slug", details: { $push: "$$ROOT" } } }
        ])

        const resp = await Promise.all([siteSettingResp, publicationResp])

        // @ts-ignore
        if (!resp[0] || resp[0].length === 0)
            throw new Error("Error when getting site setting")

        // @ts-ignore
        const languageList: string[] = resp[0]?.value
        const publicationList: {
            details: {
                id: string
                slug: string
                site: string
                language: string
            }[]
        }[] = resp[1]

        const reformatted = publicationList.map((k) => {
            const { site, slug } = k.details[0] ?? {}

            return {
                site,
                slug,
                details: languageList.map((l) => {
                    const page = k.details.find((m) => m.language === l)
                    if (page) return page
                    else
                        return {
                            _id: 0,
                            slug,
                            language: l
                        }
                })
            }
        })

        return {
            message: "Success",
            status: 200,
            publications: reformatted ?? []
        }
    } catch (error) {
        console.log("Error occured when getting page list", error)
        return { message: "Failed", status: 500 }
    }
}

export const updatePublicationStatus = async (
    publicationId: string,
    status: boolean
) => {
    try {
        await connectMongoDB()
        const user = await Publication.updateOne(
            { _id: publicationId },
            {
                status: status ? 1 : 0
            }
        )
        if (user.acknowledged) return { status: 200, message: "Success" }
        else throw new Error("Error in updating publication status")
    } catch (e) {
        console.log("Error in updating publication status", e)
        return { status: 500, message: "Failed" }
    }
}

export const getPublicationHistory = async (publicaitonId: string) => {
    try {
        const historyResp = await HistoryService.getSchemaHistory(Publication, {
            _id: publicaitonId
        })

        if (historyResp.status === 200) return historyResp
        else throw new Error("Error in getting page publication history")
    } catch (e) {
        console.log("Error in getting publication history", e)
        return { status: 500, message: "Failed" }
    }
}
