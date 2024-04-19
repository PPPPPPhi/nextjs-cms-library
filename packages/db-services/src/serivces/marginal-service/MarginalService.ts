import { Navigation, NavigationService } from "../.."
import connectMongoDB from "../../database/connectMongoDB"
import Marginal from "../../database/models/marginal/Marginal"
import { getOperatorInfo } from "../auth-service/authService"
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
                "propertie",
                "language",
                "createdBy",
                "updatedBy"
            ]
        )
        return {
            message: "Success",
            status: 200,
            marginals
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

        const marginalProp = {
            ...properties
        }

        console.log(`[marginal] save`, marginalProp, properties)

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

        console.log(`[marginal] save`, marginal, properties)

        if (type == "nav") {
            const { navJson } = properties as marginalNavType

            await NavigationService.createNavtion({
                site,
                language,
                navJson: JSON.stringify(navJson)
            })
        }

        return { message: "Success", status: 200 }
    } catch (error) {
        console.log("Error occured when creating Footer", error)
        return { message: "Failed", status: 500 }
    }
}
