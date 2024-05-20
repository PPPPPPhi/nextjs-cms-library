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
        const { publication } = await getPublicationBySiteVersion(site, version)

        console.log(`[publishSetting] getSiteSetting setting`, setting)
        console.log(`[publishSetting] getSiteSetting publication`, publication)

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
            const data = {
                ...setting,
                _id: new Types.ObjectId(),
                settingVersion:
                    versionHistory ?? HistoryService.getFullVersion("0"),
                status: 1,
                __history: settingHistory
            }
            const newPublishSetting = new (mongoose.models
                .SettingPublication as Model<any, {}, {}, {}, any, any>)({
                ...setting,
                _id: new Types.ObjectId(),
                settingVersion:
                    versionHistory ?? HistoryService.getFullVersion("0"),
                status: 1,
                __history: settingHistory
            })
            console.log(`[publishSetting] before save new`, data)
            await newPublishSetting.save()
            return { message: "Success", status: 200 }
        } else {
            const { properties, site } = publication._doc

            const { createdAt } = publication
            publication.createdAt = createdAt
            publication.settingVersion = settingVersion ?? versionHistory
            publication.properties = properties
            publication.__history = settingHistory

            console.log(
                `[publishSetting] before update old`,
                publication,
                settingVersion
            )
            await publication.save()
            return { message: "Success", status: 200 }
        }
    } catch (e) {
        console.log("Error in Getting Image", e)
        return { message: "Fail", status: 500 }
    }
}

export const getPublicationBySiteVersion = async (
    site: string,
    version?: string
) => {
    try {
        const mongoose = await connectMongoDB()

        const filter = _.omitBy(
            {
                site,
                settingVersion: version
                    ? HistoryService.getFullVersion(version)
                    : ""
            },
            _.isEmpty
        )

        console.log(`getPublicationBySiteVersion filter`, filter)

        const publication = await (
            mongoose.models.SettingPublication as Model<
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

export const getSettingPublicationList = async (site: string) => {
    try {
        const mongoose = await connectMongoDB()

        const historiesList = await (
            mongoose.models.SettingPublication as Model<
                any,
                {},
                {},
                {},
                any,
                any
            >
        ).aggregate([{ $match: { site } }])

        if (historiesList)
            return { message: "Success", status: 200, histories: historiesList }
        else throw new Error("Error in getting site setting publication list")
    } catch (e) {
        console.log("Error in getting publicaiton", e)
        return { message: "Fail", status: 500, publication: null }
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

        console.log(`[getSettingPublicationHistory]`, historyResp)

        if (historyResp.status === 200) return historyResp
        else
            throw new Error("Error in getting site setting publication history")
    } catch (e) {
        console.log("Error in getting site setting publication history", e)
        return { status: 500, message: "Failed" }
    }
}
