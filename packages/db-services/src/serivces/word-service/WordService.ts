import { Model } from "mongoose"
import { connectMongoDB } from "../.."
import { wordType as WType } from "../.."
import _ from "lodash"

export const getSiteSetting = async (site: string, lang?: string) => {
    try {
        const mongoose = await connectMongoDB()

        const words = (await (
            mongoose.models.SiteSetting as Model<any, {}, {}, {}, any, any>
        ).findOne({ site, lang }, "-createdAt -createdBy")) as WType

        console.log(`words`, site, lang, words)

        if (words) return words
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting", e)
        return null
    }
}

const replaceByDefault = (d: string, s: string) => {
    if (!s) return d
}

export const getWordsBySiteLang = async (site: string, lang: string) => {
    try {
        const mongoose = await connectMongoDB()

        const { contents: defaultDict } = await (
            mongoose.models.Word as Model<any, {}, {}, {}, any, any>
        ).findOne({ site: "admin", lang })

        const { contents: siteDict } = await (
            mongoose.models.Word as Model<any, {}, {}, {}, any, any>
        ).findOne({ site, lang })

        if (defaultDict && siteDict)
            return _.mergeWith(defaultDict, siteDict, replaceByDefault)
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting", e)
        return null
    }
}

function pipelineAllSiteLang(site: string, lang: string[]) {
    const facetObj: { [k: string]: {} } = {}

    lang.map((l: string) => {
        facetObj[l] = { $match: { lang: l } }
    })

    return [
        { $match: { site } },
        {
            $facet: facetObj
        }
    ]
}

export const getWordsBySiteAllLang = async (site: string, lang: string[]) => {
    try {
        const mongoose = await connectMongoDB()

        const { contents: defaultDict } = await (
            mongoose.models.Word as Model<any, {}, {}, {}, any, any>
        ).findOne({ site: "admin", lang })

        const adminPipleline = pipelineAllSiteLang("admin", [...lang])

        console.log(`adminPipeline`, adminPipleline)
        // const defaultAdminWords = await (
        //     mongoose.models.Word as Model<any, {}, {}, {}, any, any>
        // ).aggregate(adminPipleline)

        const { contents: siteDict } = await (
            mongoose.models.Word as Model<any, {}, {}, {}, any, any>
        ).findOne({ site, lang })

        if (defaultDict && siteDict)
            return _.mergeWith(defaultDict, siteDict, replaceByDefault)
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting", e)
        return null
    }
}

export const updateWordsBySiteLang = async (site: string, lang: string) => {
    try {
        const mongoose = await connectMongoDB()

        const words = await (
            mongoose.models.Word as Model<any, {}, {}, {}, any, any>
        ).findOne({ site, lang })

        console.log(`words`, site, lang, words)

        if (words) return words
        else return null
    } catch (e) {
        console.log("Error occured in getting site setting", e)
        return null
    }
}

export const refreshLangCache = async () => {
    try {
        const mongoose = await connectMongoDB()
        const model = mongoose.models.Word as Model<any, {}, {}, {}, any, any>

        console.log(`began watch words collection`)

        model
            .watch([], { fullDocument: "updateLookup" })
            .on("change", async (event: any) => {
                console.log(`ready to refreshLangCache`)

                const data = new URLSearchParams()
                data.append("tag", "updateLang")

                const res = await fetch(
                    "http://localhost:3000/api/getDictionaryByLang",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: data
                    }
                )

                console.log(`service trigger updateLang `, res)
            })

        return {}
    } catch (err) {
        console.log("Error occured in getting site setting", err)
        return null
    }
}
