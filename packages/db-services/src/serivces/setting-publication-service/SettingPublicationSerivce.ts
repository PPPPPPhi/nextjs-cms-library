import { Model, Types } from "mongoose"
import SettingPublication from "../../database/models/setting-publication/SettingPublication"
import { getSiteSetting } from "../site-setting-service/SiteSettingService"
import {
    getOperatorInfo,
    HistoryService,
    settingPublicationType as spType,
    siteSettingType as sType
} from "../../"
import * as _ from "lodash"
import { connectMongoDB } from "../../"

export const publishSetting = async (site: string, version?: string) => {
    try {
        const mongoose = await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const versionHistory = HistoryService.getFullVersion(version as string)
        const setting = (await getSiteSetting(
            site,
            version && versionHistory
        )) as sType & { settingVersion: string }
        const { publication } = await getPublicationBySite(site)

        const { properties, settingVersion } = setting

        const settingHistory = {
            event: "publishSetting",
            user: operatorId, // An object id of the user that generate the event
            reason: undefined,
            data: undefined, // Additional data to save with the event
            type: "major", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
            method: "Publishing site setting"
        }

        if (!publication) {
            const newPublishSetting = new (mongoose.models
                .SettingPublication as Model<any, {}, {}, {}, any, any>)({
                ...setting,
                _id: new Types.ObjectId(),
                settingVersion:
                    versionHistory ?? HistoryService.getFullVersion("0"),
                status: 1,
                __history: settingHistory
            })

            await newPublishSetting.save()
            return { message: "Success", status: 200 }
        } else {
            const publishSetting = new (mongoose.models
                .SettingPublication as Model<any, {}, {}, {}, any, any>)({
                ...publication,
                _id: new Types.ObjectId(),
                settingVersion: publication?.settingVersion ?? versionHistory,
                status: 1,
                __history: settingHistory
            })

            await publishSetting.save()
            return { message: "Success", status: 200 }
        }
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}

export const getPublicationBySite = async (site: string) => {
    try {
        const mongoose = await connectMongoDB()

        const publication = await (
            mongoose.models.SettingPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >
        ).findOne({
            site
        })
        if (publication?._id) return publication
        else return { message: "Fail", status: 500 }
    } catch (e) {
        console.log("Error in getting publicaiton", e)
        return null
    }
}

export const getSettingPublicationHistory = async (site: string) => {
    try {
        const mongoose = await connectMongoDB()

        const historyResp = await HistoryService.getSchemaHistory(
            mongoose.models.SettingPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >,
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
