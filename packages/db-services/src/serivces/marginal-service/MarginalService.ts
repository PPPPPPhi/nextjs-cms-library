import connectMongoDB from "../../database/connectMongoDB"
import Marginal from "../../database/models/marginal/Marginal"
import { getOperator } from "../auth-service/authService"

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
        const marginals = await Marginal.findOne({ site, type, language: lang })

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

        const operator = await getOperator()

        const marginal = new Marginal({
            site,
            type,
            properties: {
                ...properties
            },
            createdBy: operator,
            updatedBy: operator
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

        const operator = await getOperator()
        const marginal = await Marginal.findOneAndUpdate(
            { site, type, language },
            {
                properties: { ...properties },
                updatedBy: operator
            },
            { upsert: true }
        )

        return { message: "Success", status: 200 }
    } catch (error) {
        console.log("Error occured when creating Footer", error)
        return { message: "Failed", status: 500 }
    }
}
