import connectMongoDB from "../../database/connectMongoDB"
import SiteSetting from "../../database/models/site-setting/SiteSetting"
import { getOperatorId } from "../auth-service/authService"
import { getOperator } from "../auth-service/authService"
import * as _ from "lodash"
import { siteSettingType as sType } from "../.."
import { HistoryService } from "../index"

export const initializeSiteSetting = async (site: string) => {
    try {
        await connectMongoDB()
        const operator = await getOperator()
        const operatorId = await getOperatorId()

        const setting = {
            site,
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
            __history: {
                event: "Initialize site setting",
                user: operatorId, // An object id of the user that generate the event
                reason: undefined,
                data: undefined, // Additional data to save with the event
                type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                method: "initializeSiteSetting" // Optional and intended for method reference
            }
        }

        const settings = new SiteSetting({
            ...setting,
            createdBy: operator,
            updatedBy: operator
        })

        await settings.save()
        return { status: 200, message: "Success" }
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

        let versionSetting = null

        if (version) {
            const versionResp = await setting.getVersion(version)
            const settingVersion = versionResp.version
            versionSetting = { ...versionResp.object, settingVersion }
        } else {
            const settingVersionResp = await setting.getDiffs({ limit: 1 })
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

        const setting = await SiteSetting.findOne(
            { site, [`properties.${key}`]: { $ne: null } },
            "-createdAt -createdBy"
        )

        if (setting) return setting.properties[key]
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
        const operator = await getOperator()
        const operatorId = await getOperatorId()

        const settings = (await SiteSetting.findOne({ site })) as sType
        const { createdAt } = settings

        settings.createdAt = createdAt
        settings.properties = properties
        settings.updatedBy = operator
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
        const historyResp = await HistoryService.getSchemaHistory(SiteSetting, {
            site
        })

        if (historyResp.status === 200) return historyResp
        else throw new Error("Error in getting site setting history")
    } catch (e) {
        console.log("Error in getting site setting history", e)
        return { status: 500, message: "Failed" }
    }
}
