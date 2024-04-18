import connectMongoDB from "../../database/connectMongoDB"
import Promotion from "../../database/models/promotion/Promotion"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperatorInfo } from "../auth-service/authService"
import _ from "lodash"
import {
    FilterOrdersParam,
    QueryOperatior,
    getParsedQuery,
    getUpsertSingleDocumentQuery
} from "../utils"
import { Types } from "mongoose"

type createPromotionType = {
    site: string
    promotion: string
    startDate: string
    endDate: string
    items: string[]
    promotionCode: string
}

export const createPromotion = async (f: createPromotionType) => {
    const { promotion, startDate, endDate, items, promotionCode } = f

    try {
        await connectMongoDB()

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
                    method: "createPromotion",
                    event: "Register New Promotion"
                }
            },
            Promotion,
            { _id: new Types.ObjectId() },
            newDocument
        )

        if (create) return { message: "Success", status: 200 }
        else throw new Error("Error in Register New Promotion")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

// export const getPromotion = async (site: string, type: string, lang: string) => {
//     try {
//         await connectMongoDB()
//         const marginals = await Promotion.findOne({ site, type, language: lang })

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

type FilterPromotionParam = {
    promotion?: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
    items?: string | undefined
    promotionCode?: string | undefined
}

export const getFilterPromotion = async (filter: FilterPromotionParam) => {
    try {
        await connectMongoDB()
        console.log(`getFilterPromotions filter`, filter)

        let promotion

        const query = getParsedQuery(filter)

        console.log(`getFilterPromotions query`, filter)
        //@ts-ignore
        promotion = Promotion.find(query)

        if (promotion) return promotion
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}
