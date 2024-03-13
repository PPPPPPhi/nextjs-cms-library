import connectMongoDB from "@/db-services/database/connectMongoDB"
import Navigation from "@/db-services/database/models/navigation/Navigation"
import { getOperator, getOperatorId } from "../auth-service/authService"
import { Schema } from "mongoose"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"

type navType = {
    name: string
    site: string
    navJson: string
}

export const getNavigationList = async (site: string) => {
    try {
        await connectMongoDB()

        const siteSettingResp = await getSiteSettingByKey(site, "cms_language")
        const navResp = Navigation.aggregate([
            { $match: { site } },
            { $group: { _id: "$site", details: { $push: "$$ROOT" } } }
        ])

        const resp = await Promise.all([siteSettingResp, navResp])

        // @ts-ignore
        if (!resp[0] || resp[0].length === 0)
            throw new Error("Error when getting navigation")

        const languageList = resp[0]?.[0].value
        const navList = resp[1]

        const reformatted = navList.map((k) => {
            return {
                site,
                details: languageList.map((l: string) => {
                    const nav = k.details.find(
                        (m: { language: string }) => m.language === l
                    )
                    if (nav) return nav
                    else
                        return {
                            _id: 0,
                            site,
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
        const { name, site, navJson } = nav

        await connectMongoDB()
        const operator = await getOperator()

        const navigation = new Navigation({
            name,
            navJson,
            site,
            createdBy: operator,
            createdAt: operator
        })

        await navigation.save()
        return { message: "Success", status: 200 }
    } catch (e) {
        console.log("Error in creating navigation", e)
        return { message: "Fail", status: 500 }
    }
}
