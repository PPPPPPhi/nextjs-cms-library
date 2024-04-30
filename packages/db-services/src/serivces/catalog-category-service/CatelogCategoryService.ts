import { getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import {
    FilterOrdersParam,
    QueryOperatior,
    getParsedQuery,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types, Model } from "mongoose"
import { connectMongoDB } from "../.."

type createCategoryType = {
    category: string
    subCategory: string
    site: string
}

export const createCatelogCategory = async (f: createCategoryType) => {
    const { category, subCategory, site } = f

    try {
        const mongoose = await connectMongoDB()
        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const newDocument = {
            category,
            subCategory,
            site
        }

        const create = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: name ?? "SYSTEM",
                id: operatorId,
                historyData: {
                    method: "createCatelogCategory",
                    event: "Register New category"
                }
            },
            mongoose.models.Category as Model<any, {}, {}, {}, any, any>,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (create) return { message: "Success", status: 200 }
        else throw new Error("Error in Register New category")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

// export const getCatelogProduct = async (site: string, type: string, lang: string) => {
//     try {
//         const mongoose = await connectMongoDB()
//         const marginals = await CatelogProduct.findOne({ site, type, language: lang })

//         return {
//             message: "Success",
//             status: 200,
//             marginals
//         }
//     } catch (error) {
//         console.log("Error occured when getting nav list", error)
//         return { message: "Failed", status: 500 }
//     }
// }

type FilterCatelogCategoryParam = {
    category: string | undefined
    subCategory: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
}

export const getFilterCategory = async (filter: FilterCatelogCategoryParam) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCatelogProducts filter`, filter)

        const query = getParsedQuery(filter)

        const category = await getProjectedQuery(
            mongoose.models.Category as Model<any, {}, {}, {}, any, any>,
            query,
            [
                { $set: { display: "$display.displayOrder" } },
                { $set: { published: "$display.published" } }
            ],
            [
                "_id",
                "name",
                "description",
                "parentCategory",
                "display",
                "published",
                "updatedBy",
                "updatedAt"
            ]
        )

        if (category) return category
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getCategoryById = async (site: string, id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterCustomer filter`)

        const parsedId = new Types.ObjectId(id)

        const categoryInfo = await getProjectedQuery(
            mongoose.models.Category as Model<any, {}, {}, {}, any, any>,
            { _id: parsedId, site },
            [],
            [
                "_id",
                "name",
                "description",
                "parentCategory",
                "picture",
                "display",
                "mappings",
                "SEO",
                "products"
            ]
        )

        console.log(`categoryInfo found`, categoryInfo?.[0])

        if (categoryInfo?.[0]) return categoryInfo?.[0]
        else return []
    } catch (err) {}
}
