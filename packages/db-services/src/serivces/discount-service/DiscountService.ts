import { Model, Types } from "mongoose"
import { getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import {
    QueryOperatior,
    getParsedQuery,
    getProjectedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { connectMongoDB } from "../.."

type createDiscountType = {
    site: string
    promotion: string
    startDate: string
    endDate: string
    items: string[]
    promotionCode: string
}

export const createDiscount = async (f: createDiscountType) => {
    const { promotion, startDate, endDate, items, promotionCode } = f

    try {
        const mongoose = await connectMongoDB()

        const operator = await getOperatorInfo()
        const { id: operatorId, name } = operator

        const newDocument = {
            promotion,
            startDate,
            endDate,
            items,
            promotionCode
        }

        const create = await getUpsertSingleDocumentQuery(
            QueryOperatior.SET,
            {
                name: name ?? "SYSTEM",
                id: operatorId,
                historyData: {
                    method: "createDiscount",
                    event: "Register New Discount"
                }
            },
            mongoose.models.Discount as Model<any, {}, {}, {}, any, any>,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (create) return { message: "Success", status: 200 }
        else throw new Error("Error in Register New Discount")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

// export const getDiscount = async (site: string, type: string, lang: string) => {
//     try {
//         const mongoose = await connectMongoDB()
//         const marginals = await Discount.findOne({ site, type, language: lang })

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

type FilterDateRange = {
    $gte: Date
    $lte: Date
}

type FilterDiscountParam = {
    promotion?: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
    items?: string | undefined
    promotionCode?: string | undefined
}

export const getFilterDiscount = async (filter: FilterDiscountParam) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getFilterDiscounts filter`, filter)

        const query = getParsedQuery(filter)

        const discount = await getProjectedQuery(
            mongoose.models.Discount as Model<any, {}, {}, {}, any, any>,
            query,
            [{ $set: { nUsed: { $size: "$usageHistory" } } }],
            [
                "_id",
                "name",
                "discountType",
                "discountPercentage",
                "startDate",
                "endDate",
                "nUsed",
                "isActive"
            ]
        )

        console.log(`getFilterDiscount`, discount)

        if (discount) return discount
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}

export const getDiscountById = async (site: string, id: string) => {
    try {
        const mongoose = await connectMongoDB()
        console.log(`getDiscountById `, id)

        const parsedId = new Types.ObjectId(id)

        const discountInfo = await getProjectedQuery(
            mongoose.models.Discount as Model<any, {}, {}, {}, any, any>,
            { _id: parsedId, site },
            [],
            [
                "_id",
                "isActive",
                "name",
                "discountType",
                "applyToSubcategories",
                "usePercentage",
                "discountPercentage",
                "maximumDiscountAmount",
                "requiresCouponCode",
                "couponCode",
                "urlWithCouponCode",
                "startDate",
                "endDate",
                "cumulativeWithOtherDiscounts",
                "discountLimitation",
                "nTimes",
                "maaximumDiscountedQuantity",
                "adminComment",
                "requirements",
                "appliedToProducts",
                "appliedToCategories",
                "appliedToManufacturers",
                "usageHistory",
                "createdAt"
            ]
        )

        if (discountInfo?.[0]) return discountInfo?.[0]
        else return []
    } catch (err) {}
}
