import { connectMongoDB } from "../../database/connectMongoDB"
import { getOperatorInfo } from "../auth-service/authService"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import * as _ from "lodash"
import { HistoryService, MarginalService } from "../../"
import { Types, Model } from "mongoose"
import { getProjectedQuery } from "../utils"

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

        console.log(`[publishMarginal] getMar`, getMarginal)

        const { marginals } = getMarginal
        const { publication } = await getMarginalPublicationByVersion(
            site,
            type,
            lang,
            versionHistory
        )

        const marginalHistory = {
            event: "Publish marginal",
            user: operatorId,
            reason: undefined,
            data: undefined,
            type: "major",
            method: "publish marginal"
        }

        console.log(
            `[publish] before publish marginal`,
            marginals,
            !publication
        )

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
            const { properties, site } = publication._doc

            const { createdAt } = publication
            publication.createdAt = createdAt
            publication.marginalVersion = versionHistory
            publication.properties = properties
            publication.__history = marginalHistory

            await publication.save()
            return { message: "Success", status: 200 }
        }
    } catch (e) {
        console.log("Error in publishPage", e)
        return { message: "Fail", status: 500 }
    }
}

export const getMarginalPublicationByVersion = async (
    site: string,
    type: string,
    language: string,
    version?: string
) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`models??`, site, type, language, version, type == "common")

        const filter = _.omitBy(
            {
                site,
                type,
                language: type == "common" ? "" : language,
                marginalVersion: version
            },
            _.isEmpty
        )

        const publication = await (
            mongoose.models.MarginalPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >
        ).findOne(filter)

        if (publication?._id)
            return { message: "Success", status: 200, publication }
        else return { message: "Fail", status: 500, publication: null }
    } catch (e) {
        console.log("Error in getting publicaiton", e)
        return { message: "Fail", status: 500, publication: null }
    }
}

export const getMarginalPublicationList = async (
    site: string,
    type: string
) => {
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
            { $match: { site, type } },
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

export const getMarginalPublicationHistory = async (
    site: string,
    type: string
) => {
    try {
        const mongoose = await connectMongoDB()

        const getHistory = await getProjectedQuery(
            mongoose.models.MarginalPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >,
            { site, type },
            [],
            [
                "site",
                "type",
                "properties",
                "language",
                "marginalVersion",
                "updatedBy",
                "_id",
                "createdAt",
                "updatedAt",
                "version"
            ]
        )

        console.log(`[marginalpub]`, getHistory, site, type)

        return {
            message: "Success",
            status: 200,
            histories: getHistory
        }
    } catch (e) {
        console.log("Error in getting publication history", e)
        return { status: 500, message: "Failed" }
    }
}

export const getLatestPublishedMarginals = async (
    site: string,
    lang: string
) => {
    try {
        const mongoose = await connectMongoDB()

        const getLastest = async (type: string, language: string) => {
            return await getProjectedQuery(
                mongoose.models.MarginalPublication as Model<
                    any,
                    {},
                    {},
                    {},
                    any,
                    any
                >,
                { site, type, language },
                [{ $sort: { updatedAt: -1 } }, { $limit: 1 }],
                [
                    "site",
                    "type",
                    "properties",
                    "language",
                    "marginalVersion",
                    "updatedBy",
                    "_id",
                    "createdAt",
                    "updatedAt",
                    "version"
                ]
            )
        }

        const common = await getLastest("footer", lang)
        const footer = await getLastest("footer", lang)
        const header = await getLastest("header", lang)
        const nav = await getLastest("nav", lang)

        return {
            marginals: {
                common,
                footer,
                header,
                nav
            },
            status: 200,
            message: "Success"
        }
    } catch (err) {
        console.log("Error in getting latest publish marginals", err)
        return { status: 500, message: "Failed" }
    }
}
