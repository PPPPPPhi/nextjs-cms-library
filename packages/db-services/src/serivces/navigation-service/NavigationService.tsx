import connectMongoDB from "../../database/connectMongoDB"
import Navigation from "../../database/models/navigation/Navigation"
import { getOperatorInfo } from "../auth-service/authService"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types, Date } from "mongoose"
import { firstValueFrom, forkJoin } from "rxjs"

type navType = {
    site: String
    language: String
    navJson: String
}

export const getNavigationList = async (siteSlug: string) => {
    try {
        await connectMongoDB()

        const siteSettingResp = await getSiteSettingByKey(
            siteSlug,
            "cms_language"
        )
        const navResp = Navigation.aggregate([
            { $match: { siteSlug } },
            { $group: { _id: "$site", details: { $push: "$$ROOT" } } }
        ])

        const resp = await Promise.all([siteSettingResp, navResp])

        if (!resp[0]) throw new Error("Error when getting navigation")

        const languageList = resp[0]?.[0].value
        const navList = resp[1]

        //@ts-ignore
        const reformatted = navList.map((k) => {
            return {
                siteSlug,
                details: languageList.map((l: string) => {
                    const nav = k.details.find(
                        (m: { language: string }) => m.language === l
                    )
                    if (nav) return nav
                    else
                        return {
                            _id: 0,
                            siteSlug,
                            language: l
                        }
                })
            }
        })

        return { message: "Success", status: 200, pages: reformatted ?? [] }
    } catch (error) {
        console.log("Error occured when getting nav list", error)
        return { message: "Failed", status: 500 }
    }
}

export const createNavtion = async (nav: navType) => {
    try {
        const { site, language, navJson } = nav

        await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const newDocument = {
            site,
            language,
            navJson,
            createdBy: operatorName,
            updatedBy: operatorName
        }

        console.log(`[nav] new nav`, newDocument)

        const createNav = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "createNavigation",
                    event: "Register New Navigation"
                }
            },
            Navigation,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (createNav) return { message: "Success", status: 200 }
        else throw new Error("Error in register new user")
    } catch (e) {
        console.log("Error in creating navigation", e)
        return { message: "Fail", status: 500 }
    }
}
