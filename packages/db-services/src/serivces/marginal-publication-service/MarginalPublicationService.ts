import { connectMongoDB } from "../../database/connectMongoDB"
import Publication from "../../database/models/publication/Publication"
import {
    getOperator,
    getOperatorId,
    getOperatorInfo
} from "../auth-service/authService"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import { getPageById } from "../page-service/PageService"
import * as _ from "lodash"
import { HistoryService, MarginalService } from "../../"
import { Types, Model } from "mongoose"

type publishMarginalInputType = {
    site: string
    type: string
    lang: string
    version?: string
}

export const publishMarginal = async ({
    site,
    type,
    lang,
    version
}: publishMarginalInputType) => {
    try {
        const mongoose = await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const versionHistory = HistoryService.getFullVersion(version as string)

        console.log("versionHistory", JSON.stringify(versionHistory))

        const getMarginal = await MarginalService.getMarginal(
            site,
            type,
            lang,
            version
        )

        const { marginals } = getMarginal
        const { publication } = await getMarginalPublicationByPageId(
            site,
            type,
            lang
        )

        const marginalHistory = {
            __history: {
                event: "Publish marginal",
                user: operatorId, // An object id of the user that generate the event
                reason: undefined,
                data: undefined, // Additional data to save with the event
                type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                method: "publish marginal" // Optional and intended for method reference
            }
        }

        console.log(`[publish] before publish marginal`, marginals)
        if (!publication) {
            const newPublishMarginal = new (mongoose.models
                .MarginalPublication as Model<any, {}, {}, {}, any, any>)({
                ...marginals,
                _id: new Types.ObjectId(),
                marginalVersion:
                    versionHistory ?? HistoryService.getFullVersion("0"),
                status: 1,
                __history: marginalHistory
            })

            await newPublishMarginal.save()
            return { message: "Success", status: 200 }
        } else {
            const publishMarginal = new (mongoose.models
                .MarginalPublication as Model<any, {}, {}, {}, any, any>)({
                ...publication,
                _id: new Types.ObjectId(),
                marginalVersion: publication?.settingVersion ?? versionHistory,
                status: 1,
                __history: marginalHistory
            })

            await publishMarginal.save()
            return { message: "Success", status: 200 }
        }
    } catch (e) {
        console.log("Error in publishPage", e)
        return { message: "Fail", status: 500 }
    }
}

export const getMarginalPublicationByPageId = async (
    site: string,
    type: string,
    language: string
) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`models??`, mongoose.models)

        const publication = await (
            mongoose.models.MarginalPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >
        ).findOne({ site, type, language })

        console.log(`[publication] publication`, publication)

        if (publication?._id) return publication
        else return { message: "Fail", status: 500 }
    } catch (e) {
        console.log("Error in getting publicaiton", e)
        return null
    }
}

export const getMarginalPublicationList = async (site: string) => {
    try {
        const mongoose = await connectMongoDB()

        const siteSettingResp = getSiteSettingByKey(site, "cms_language")
        const publicationResp = (
            mongoose.models.MarginalPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >
        ).aggregate([
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

export const updateMarginalPublicationStatus = async (
    publicationId: string,
    status: boolean
) => {
    try {
        const mongoose = await connectMongoDB()
        const user = await (
            mongoose.models.MarginalPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >
        ).updateOne(
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

export const getMarginalPublicationHistory = async (publicaitonId: string) => {
    try {
        const historyResp = await HistoryService.getSchemaHistory(
            mongoose.models.MarginalPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >,
            {
                _id: publicaitonId
            }
        )

        if (historyResp.status === 200) return historyResp
        else throw new Error("Error in getting page publication history")
    } catch (e) {
        console.log("Error in getting publication history", e)
        return { status: 500, message: "Failed" }
    }
}
