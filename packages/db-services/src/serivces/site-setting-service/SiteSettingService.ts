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
            siteSlug: site,
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
            createdBy: operator,
            updatedBy: operator
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
            { siteSlug: site },
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

export const getSiteSettingByKey = async (siteSlug: string, key: string) => {
    try {
        await connectMongoDB()

        console.log(`[siteSetting] by key`, siteSlug, key)

        const setting = await getProjectedQuery(
            SiteSetting,
            { siteSlug, [`properties.${key}`]: { $ne: null } },
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

        console.log(`[SiteSetting] updateSiteSetting`, site, properties)

        const newDocument = {
            properties,
            updatedBy: operator,
            updatedAt: new Date()
        }

        const upsertRole = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName,
                id: operatorId,
                historyData: {
                    method: "updateSiteSetting",
                    event: "updating site setting"
                }
            },
            SiteSetting,
            { siteSlug: site },
            newDocument
        )

        console.log(`[SiteSetting] updateSiteSetting`, upsertRole)

        if (upsertRole) return { message: "Success", status: 200 }
        else throw new Error("Error in updating role")
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
