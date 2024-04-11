import connectMongoDB from "../../database/connectMongoDB"
import Promotion from "../../database/models/promotion/Promotion"
import promotionModal from "../../database/models/promotion/Promotion"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator } from "../auth-service/authService"
import _ from "lodash"
import { getParsedQuery } from "../utils"

type promotionType = {
    name: string
    description: string
}

export const initializeFunction = async () => {
    try {
        await connectMongoDB()
        const defaultFunctions = RoleFunction.role

        //@ts-ignore
        const promotions = await Promotion.insertMany(defaultFunctions)
        return {
            message: "Success",
            status: 200,
            promotionIds: promotions.map((l) => l._id)
        }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

export const createPromotion = async (f: promotionType) => {
    const { name, description } = f

    try {
        await connectMongoDB()

        const func = new promotionModal({
            name,
            description
        })

        await func.save()
        return { message: "Success", status: 200 }
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