import { Model, Types } from "mongoose"
import { getOperatorInfo } from "../auth-service/authService"
import {
    QueryOperatior,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import _ from "lodash"
import { HistoryService, connectMongoDB } from "../.."

type marginalCommonType = {
    footerCss: string
    footerScript: string
}

type marginalFooterType = {
    footerHtml: string
}

type marginalHeaderType = {
    headerLargeLogo: string
    headerSmallLogo: string
}

type marginalNavType = {
    navJson: string
}

export const getMarginal = async (
    site: string,
    type: string,
    language?: string,
    version?: string
) => {
    try {
        const mongoose = await connectMongoDB()

        const filter = _.omitBy(
            {
                site,
                type,
                language
            },
            _.isEmpty
        )

        const marginals = await getProjectedQuery(
            mongoose.models.Marginal as Model<any, {}, {}, {}, any, any>,
            filter,
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
    type: "footer" | "header" | "nav" | "common",
    properties:
        | marginalFooterType
        | marginalHeaderType
        | marginalNavType
        | marginalCommonType
) => {
    try {
        const mongoose = await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        const marginal = new (mongoose.models.Marginal as Model<
            any,
            {},
            {},
            {},
            any,
            any
        >)({
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

type MarginalPropsType = {
    footerCss?: string
    footerHtml?: string
    footerScript?: string
    navJson?: string
    headerLargeLogo?: string
    headerSmallLogo?: string
    headerLargeRatio?: string
    headerSmallRatio?: string
}

export const getMarginalPropsByType = (
    type: string,
    properties: MarginalPropsType
) => {
    let props

    const {
        footerCss,
        footerHtml,
        footerScript,
        navJson,
        headerLargeLogo,
        headerSmallLogo,
        headerLargeRatio,
        headerSmallRatio
    } = properties

    switch (type) {
        case "common":
            props = {
                footerCss,
                footerScript
            }
            break
        case "nav":
            props = {
                navJson
            }
            break
        case "header":
            props = {
                headerLargeLogo,
                headerSmallLogo,
                headerLargeRatio,
                headerSmallRatio
            }
            break
        case "footer":
            props = {
                footerHtml
            }
            break
        default:
            props = {
                footerCss,
                footerScript
            }
            break
    }
    return props
}

export const saveMarginal = async (
    site: string,
    type: "footer" | "header" | "nav" | "common",
    language: string,
    properties:
        | marginalFooterType
        | marginalHeaderType
        | marginalNavType
        | marginalCommonType
) => {
    try {
        const mongoose = await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name: operatorName } = operator

        console.log(`[marginal] save`, type, properties)

        const marginalProp = {
            ...getMarginalPropsByType(type, properties)
        }

        console.log(`getMarginalPropsByType `, marginalProp)
        const marginal = await (
            mongoose.models.Marginal as Model<any, {}, {}, {}, any, any>
        ).findOneAndUpdate(
            { site, type, language },
            {
                $set: {
                    properties: marginalProp,
                    updatedBy: operatorName
                }
            },
            { new: true, upsert: true }
        )

        await marginal.save()

        if (marginal) return { message: "Success", status: 200 }
        else throw new Error("Error occured when saving arginal")
    } catch (error) {
        console.log("Error occured when saving Marginal", error)
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
        const mongoose = await connectMongoDB()

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
            mongoose.models.Marginal as Model<any, {}, {}, {}, any, any>,
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

export const getMarginalHistory = async (site: string, type: string) => {
    try {
        const mongoose = await connectMongoDB()
        const historyResp = await HistoryService.getSchemaHistory(
            mongoose.models.Marginal as Model<any, {}, {}, {}, any, any>,
            {
                site,
                type
            }
        )
        console.log(`[getMarginalHistory]`, historyResp)
        if (historyResp.status === 200)
            return {
                message: "Success",
                status: 200,
                marginals: historyResp
            }
        else throw new Error("Error in getting site setting history")
    } catch (e) {
        console.log("Error in getting site setting history", e)
        return { status: 500, message: "Failed" }
    }
}
