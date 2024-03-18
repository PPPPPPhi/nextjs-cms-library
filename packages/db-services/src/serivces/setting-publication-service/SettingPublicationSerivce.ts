import connectMongoDB from "../../database/connectMongoDB"
import SettingPublication from "../../database/models/setting-publication/SettingPublication"
import { getSiteSetting } from "../site-setting-service/SiteSettingService"
import {
    HistoryService,
    settingPublicationType as spType,
    siteSettingType as sType
} from "../../"
import * as _ from "lodash"

export const publishSetting = async (site: string, version?: string) => {
    try {
        await connectMongoDB()

        const versionHistory = HistoryService.getFullVersion(version as string)
        const setting = (await getSiteSetting(
            site,
            version && versionHistory
        )) as sType & { settingVersion: string }
        const publication = (await getPublicationBySite(site)) as spType

        const { properties, settingVersion } = setting
        const publishResp = await HistoryService.publicateSchema(
            { properties, settingVersion, site },
            SettingPublication,
            "Publishing site setting",
            "publishSetting",
            publication
        )
        return publishResp
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}

export const getPublicationBySite = async (site: string) => {
    try {
        await connectMongoDB()
        const publicaiton = (await SettingPublication.findOne({
            site
        })) as spType

        if (publicaiton._id) return publicaiton
        else throw new Error("No publicaiton yet")
    } catch (e) {
        console.log("Error in getting publicaiton", e)
        return null
    }
}

export const getSettingPublicationHistory = async (site: string) => {
    try {
        const historyResp = await HistoryService.getSchemaHistory(
            SettingPublication,
            {
                site
            }
        )

        if (historyResp.status === 200) return historyResp
        else
            throw new Error("Error in getting site setting publication history")
    } catch (e) {
        console.log("Error in getting site setting publication history", e)
        return { status: 500, message: "Failed" }
    }
}
