import connectMongoDB from "../../database/connectMongoDB"
import SiteSetting from "../../database/models/site-setting/SiteSetting"
import { getOperatorId, getOperatorInfo } from "../auth-service/authService"
import { getOperator } from "../auth-service/authService"
import * as _ from "lodash"
import { siteSettingType as sType } from "../.."
import { HistoryService } from "../index"
import {
    QueryOperatior,
    getProjectedVersionQuery,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"

export const initializeSiteSetting = async (site: string) => {
    try {
        await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const newDocument = {
            site: site,
            properties: {
                cms_language: {
                    name: "Website Language",
                    value: ["en"]
                },
                cms_asset_path: {
                    name: "Website Assets Path",
                    value: {
                        en: process.env.NEXT_ASSEST_PATH
                    }
                }
            },
            createdBy: operatorName,
            updatedBy: operatorName
        }

        const createRes = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    event: "Initialize site setting",
                    method: "initializeSiteSetting"
                }
            },
            SiteSetting,
            { site: site },
            newDocument
        )

        if (createRes) return { message: "Success", status: 200 }
        else throw new Error("Error in register new user")
    } catch (e) {
        console.log("Error occured in initializing site setting", e)
        return { message: e, status: 500 }
    }
}

export const getSiteSetting = async (site: string, version?: string) => {
    try {
        await connectMongoDB()

        let setting = (await SiteSetting.findOne(
            { site },
            "-createdAt -createdBy"
        )) as sType

        console.log("version", version)
        console.log("setting sitesitesite", site)

        console.log(`[SiteSetting] setting`, setting)

        let versionSetting = null

        if (version) {
            const versionResp = await setting.getVersion(version)

            console.log(`[SiteSetting] getVersion`, versionResp)

            const settingVersion = versionResp.version
            versionSetting = { ...versionResp.object, settingVersion }
        } else {
            const settingVersionResp = await setting.getDiffs({ limit: 1 })
            console.log(`[SiteSetting] getDiffs`, settingVersionResp)
            setting = {
                ...setting._doc,
                settingVersion: settingVersionResp[0]?.version
            }
        }

        if (setting) return versionSetting ?? setting
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting", e)
        return null
    }
}

export const getSiteSettingByKey = async (site: string, key: string) => {
    try {
        await connectMongoDB()

        console.log(`[siteSetting] by key`, site, key)

        const setting = await getProjectedQuery(
            SiteSetting,
            { site, [`properties.${key}`]: { $ne: null } },
            [],
            [`properties.${key}`]
        )

        console.log(`[siteSetting] by key`, setting)

        if (setting) return setting[0].properties[key]
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting")
        return null
    }
}

export const updateSiteSetting = async (
    site: string,
    properties: { [s: string]: any }
): Promise<{ status: number; message: string }> => {
    try {
        await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const settings = (await SiteSetting.findOne({ site })) as sType
        const { createdAt } = settings

        settings.createdAt = createdAt
        settings.properties = properties
        settings.updatedBy = operatorName
        settings.__history = {
            event: "updating site setting",
            user: operatorId, // An object id of the user that generate the event
            reason: undefined,
            data: undefined, // Additional data to save with the event
            type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
            method: "updateSiteSetting" // Optional and intended for method reference
        }

        await settings.save()
        return { message: "Success", status: 200 }
    } catch (e) {
        console.log("Error when updating site settings", e)
        return { status: 500, message: "Site settings is not be updated" }
    }
}

export const getSiteSettingHistory = async (site: string) => {
    try {
        console.log(`[getSiteSettingHistory]`)
        const historyResp = await HistoryService.getSchemaHistory(SiteSetting, {
            site
        })
        console.log(`[getSiteSettingHistory]`, historyResp)
        if (historyResp.status === 200) return historyResp
        else throw new Error("Error in getting site setting history")
    } catch (e) {
        console.log("Error in getting site setting history", e)
        return { status: 500, message: "Failed" }
    }
}
