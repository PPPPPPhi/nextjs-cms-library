import connectMongoDB from "../../database/connectMongoDB"
import Page from "../../database/models/page/Page"
import {
    getOperator,
    getOperatorId,
    getOperatorInfo
} from "../auth-service/authService"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import * as _ from "lodash"
import { pageType as pType } from "../.."
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"

type pageType = {
    name: string
    description: string
    language: string
    site: string
    slug: string
}

export const createPage = async (page: pageType) => {
    const { name, slug, language, site, description } = page ?? {}

    try {
        await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        console.log(`[page] create page`, page)

        const newDocument = {
            name,
            slug,
            description,
            language,
            site: site,
            pageJson: "{}",
            status: 1,
            updatedBy: operatorName,
            createdBy: operatorName
        }

        const createRes = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "createPage",
                    event: "Create Page"
                }
            },
            Page,
            { slug, language },
            newDocument
        )

        console.log(`[upsert Role] updateRoleById`, createRes)

        if (createRes)
            return {
                message: "Success",
                status: 200,
                _id: createRes?._id
            }
        else throw new Error("Error in register new user")
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}

export const updatePage = async (
    pageId: string,
    pageDetails: { name: string; description: string }
) => {
    try {
        await connectMongoDB()

        const { name, description } = pageDetails ?? {}
        const operator = await getOperatorInfo()

        const result = await Page.findOneAndUpdate(
            { _id: pageId },
            {
                name,
                description,
                updatedBy: operator?.name
            },
            { upsert: false }
        )

        return { message: "Success", status: 200 }
    } catch (error) {
        console.log("Error occured when creating Footer", error)
        return { message: "Failed", status: 500 }
    }
}

export const cloneLanguagePage = async (
    site: string,
    slug: string,
    refLanguage: string,
    language: string
) => {
    try {
        await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId } = operator

        const page = await Page.findOne({
            site,
            slug,
            language: refLanguage
        })

        const { description, name, pageJson } = (page as pType) ?? {}

        const newPage = new Page({
            name,
            slug,
            description,
            language,
            site,
            pageJson,
            status: 1,
            updatedBy: operator,
            createdBy: operator,
            __history: {
                event: "Clone Page",
                user: operatorId, // An object id of the user that generate the event
                reason: undefined,
                data: undefined, // Additional data to save with the event
                type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                method: "clone Page" // Optional and intended for method reference
            }
        })

        await newPage.save()
        return { message: "Success", status: 200 }
    } catch (e) {
        console.log("Error in Cloning page within language", e)
        return { message: "Fail", status: 500 }
    }
}

export const getPageList = async (site: string) => {
    try {
        await connectMongoDB()

        const operator = await getOperator()

        const siteSettingResp = await getSiteSettingByKey(site, "cms_language")

        const pageList = await getProjectedQuery(
            Page,
            { site },
            [
                {
                    $group: {
                        _id: "$slug",
                        site: { $first: "$site" },
                        slug: { $first: "$slug" },
                        details: { $push: "$$ROOT" }
                    }
                }
            ],
            ["_id", "site", "slug", "details"]
        )

        const resp = await Promise.all([siteSettingResp, pageList])

        if (!resp[0]) throw new Error("Error when getting site setting")

        const languageList = resp[0]?.value as string[]

        //@ts-ignore
        const reformatted = pageList.map((k) => {
            const { slug } = k.details[0]

            return {
                ...k,
                details: languageList.map((l: string) => {
                    const page = k.details.find(
                        (m: { language: string }) => m.language === l
                    )
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
            pages: _.orderBy(reformatted ?? [], ["slug"], ["asc"])
        }
    } catch (error) {
        console.log("Error occured when getting page list", error)
        return { message: "Failed", status: 500 }
    }
}

export const getPageById = async (pageId: string, version?: string) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const page = await Page.findOne({ _id: pageId })
        let pageWithVersion

        let versionPage = null

        if (version) {
            //@ts-ignore
            const versionResp = await page.getVersion(version)
            const pageVersion = versionResp.version

            console.log(`[page] getVersion`, versionResp, page)

            versionPage = { ...versionResp.object, pageVersion }
        } else {
            //@ts-ignore
            const pageVersionResp = await page.getDiffs({ limit: 1 })
            console.log(`[page] getDiffs`, pageVersionResp, page)
            //@ts-ignore
            pageWithVersion = {
                ...(page ?? {}),
                pageVersion: pageVersionResp[0]?.version ?? "0.0.0"
            }
        }

        if (page) return versionPage ?? pageWithVersion
        else throw new Error("Error in getting page")
    } catch (e) {
        console.log("Error in getting page", e)
        return null
    }
}

export const updatePageJson = async (pageId: string, pageJson: string) => {
    try {
        await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId } = operator

        //@ts-ignore
        const page = await Page.findOne({ _id: pageId })

        //@ts-ignore
        const { createdAt } = page
        //@ts-ignore

        page.createdAt = createdAt
        //@ts-ignore
        page.updatedBy = operator
        //@ts-ignore
        page.pageJson = pageJson
        //@ts-ignore
        page.__history = {
            event: "Update Page Json",
            user: operatorId, // An object id of the user that generate the event
            reason: undefined,
            data: undefined, // Additional data to save with the event
            type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
            method: "updatePage" // Optional and intended for method reference
        }

        //@ts-ignore
        await page.save()
        return { message: "Success", status: 200 }
    } catch (e) {
        console.log("Error in updating page json", e)
        return { status: 500, message: "Failed" }
    }
}

export const getPageHistory = async (pageId: string) => {
    try {
        await connectMongoDB()
        //@ts-ignore
        const page = await Page.findOne({ _id: pageId })

        //@ts-ignore
        const histories = await page.getVersions()
        const reformatted = histories.map((k: any) => {
            return {
                ...k.object,
                event: k.event,
                version: parseInt(k.version.split(".")[0])
            }
        })

        if (page)
            return {
                message: "Success",
                status: 200,
                histories: _.orderBy(reformatted ?? [], ["version"], ["desc"])
            }
        else throw new Error("Error in getting page history")
    } catch (e) {
        console.log("Error in getting page history", e)
        return { status: 500, message: "Failed" }
    }
}
