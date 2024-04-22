import connectMongoDB from "../../database/connectMongoDB"
import Publication from "../../database/models/publication/Publication"
import {
    getOperator,
    getOperatorId,
    getOperatorInfo
} from "../auth-service/authService"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import { getPageById } from "../page-service/PageService"
import * as _ from "lodash"
import { HistoryService } from "../../"
import { Types } from "mongoose"

export const publishPage = async (pageId: string, version?: string) => {
    try {
        await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const parsedPageId = new Types.ObjectId(pageId)

        const versionHistory = HistoryService.getFullVersion(version as string)

        console.log("versionHistory", versionHistory)

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
            const { _doc, pageVersion } = page

            const { name, slug, description, language, pageJson, site } = _doc

            console.log(
                `[publish] page`,
                page,
                publication,
                JSON.stringify(operator)
            )

            if (!publication || publication?.status == 500) {
                console.log(`[publish] create new publication`)
                const newPublication = new Publication({
                    name,
                    slug,
                    description,
                    language,
                    pagePageJson: pageJson,
                    site,
                    createdBy: operatorName,
                    updatedBy: operatorName,
                    pageId,
                    pageVersion,
                    status: 1,
                    __history: pageHistoryRecorder.__history
                })

                console.log(`[publish] new publication`, newPublication)
                await newPublication.save()
                return { message: "Success", status: 200 }
            } else {
                const { createdAt } = publication
                publication.createdAt = createdAt
                publication.pageVersion = versionHistory ?? pageVersion
                publication.pagePageJson = pageJson
                publication.__history = pageHistoryRecorder.__history

                console.log(`[publish] publication`, publication)

                await publication.save()
                return { message: "Success", status: 200 }
            }
        }
    } catch (e) {
        console.log("Error in publishPage", e)
        return { message: "Fail", status: 500 }
    }
}

export const getPublicationByPageId = async (pageId: string) => {
    try {
        await connectMongoDB()
        const parsedPageId = new Types.ObjectId(pageId)
        //@ts-ignore
        const publicaiton = await Publication.findOne({ pageId })

        console.log(`[publication] no publication`, pageId)

        if (publicaiton?._id) return publicaiton
        else return { message: "Fail", status: 500 }
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
        console.log(`[publication] resp`, resp, site)

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
        console.log("Error occured when getting publications", error)
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
