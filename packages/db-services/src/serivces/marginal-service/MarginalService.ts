import { Navigation, NavigationService } from "../.."
import connectMongoDB from "../../database/connectMongoDB"
import Marginal from "../../database/models/marginal/Marginal"
import { getOperatorInfo } from "../auth-service/authService"
import { getSiteSettingByKey } from "../site-setting-service/SiteSettingService"
import { Types } from "mongoose"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"

type marginalFooterType = {
    footerHtml: string
    footerCss: string
    footerScript: string
}

type marginalHeaderType = {
    headerLargeLogo: string
    headerSmallLogo: string
}

type marginalNavType = {
    navJson: string
}

export const getMarginal = async (site: string, type: string, lang: string) => {
    try {
        await connectMongoDB()

        const marginals = await getProjectedQuery(
            Marginal,
            { site, type, language: lang },
            [],
            [
                "_id",
                "site",
                "type",
                "properties",
                "language",
                "createdBy",
                "updatedBy"
            ]
        )
        return {
            message: "Success",
            status: 200,
            marginals: marginals?.[0]
        }
    } catch (error) {
        console.log("Error occured when getting nav list", error)
        return { message: "Failed", status: 500 }
    }
}

export const createMarginal = async (
    site: string,
    type: "footer" | "header" | "nav",
    properties: marginalFooterType | marginalHeaderType | marginalNavType
) => {
    try {
        await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const marginal = new Marginal({
            site,
            type,
            properties: {
                ...properties
            },
            createdBy: operatorName,
            updatedBy: operatorName
        })

        await marginal.save()
        return { message: "Success", status: 200 }
    } catch (error) {
        console.log("Error occured when creating Footer", error)
        return { message: "Failed", status: 500 }
    }
}

export const saveMarginal = async (
    site: string,
    type: "footer" | "header" | "nav",
    language: string,
    properties: marginalFooterType | marginalHeaderType | marginalNavType
) => {
    try {
        await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        console.log(`[marginal] save`, properties)

        const marginalProp = {
            ...properties
        }

        const marginal = await Marginal.findOneAndUpdate(
            { site, type, language },
            {
                $set: {
                    properties: marginalProp,
                    updatedBy: operatorName
                }
            },
            { new: true, upsert: true }
        )

        return { message: "Success", status: 200 }
    } catch (error) {
        console.log("Error occured when creating Footer", error)
        return { message: "Failed", status: 500 }
    }
}

type cloneMarginalType = {
    site: string
    type: string
    srcLang: string
    targetLang: string
}

export const cloneMarginal = async (nav: cloneMarginalType) => {
    try {
        const { site, type, srcLang, targetLang } = nav

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const currentMarginal = await getMarginal(site, type, srcLang)

        if (!currentMarginal) throw new Error("Error in clone navigation")
        const foundProperties = currentMarginal?.marginals?.properties

        const newDocument = {
            site,
            type,
            properties: foundProperties,
            language: targetLang,
            createdBy: operatorName,
            updatedBy: operatorName
        }

        const res = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: operatorName ?? "SYSTEM",
                id: operatorId,
                historyData: {
                    method: "cloneNavigation",
                    event: `Clone Nav from ${srcLang} to ${targetLang}`
                }
            },
            Marginal,
            { site, type, language: targetLang },
            newDocument
        )

        console.log(`[nav] clone`, res)

        if (res) return { message: "Success", status: 200 }
        else throw new Error("Error in register new user")
    } catch (e) {
        console.log("Error in clone navigation", e)
        return { message: "Fail", status: 500 }
    }
}
