import connectMongoDB from "../../database/connectMongoDB"
import Category from "../../database/models/category/Category"
import categoryModal from "../../database/models/category/Category"
import { RoleFunction } from "@nextjs-cms-library/role-management/index"
import { getOperator } from "../auth-service/authService"
import _ from "lodash"

type orderType = {
    name: string
    description: string
}

export const initializeFunction = async () => {
    try {
        await connectMongoDB()
        const defaultFunctions = RoleFunction.role

        //@ts-ignore
        const category = await Category.insertMany(defaultFunctions)
        return {
            message: "Success",
            status: 200,
            orderIds: category.map((l: any) => l._id)
        }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Fail", status: 500 }
    }
}

export const createCatelogProduct = async (f: orderType) => {
    const { name, description } = f

    try {
        await connectMongoDB()

        const func = new categoryModal({
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

// export const getCatelogProduct = async (site: string, type: string, lang: string) => {
//     try {
//         await connectMongoDB()
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

type FilterDateRange = {
    $gte: Date
    $lte: Date
}

type FilterCatelogCategoryParam = {
    category: string | undefined
    subCategory: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
}

export const getFilterCategory = async (filter: FilterCatelogCategoryParam) => {
    try {
        await connectMongoDB()
        console.log(`getFilterCatelogProducts filter`, filter)

        let category

        if (filter?.startDate && filter?.endDate) {
            console.log(`getFilterOrders check date`)

            const filterClone = _.cloneDeep(filter)
            _.unset(filterClone, `startDate`)
            _.unset(filterClone, `endDate`)

            const query = {
                ...filterClone,
                createdAt: {
                    $gte: new Date(filter?.startDate),
                    $lte: new Date(filter?.endDate)
                }
            }

            console.log(`getFilterOrders query with time`, query)

            // @ts-ignore
            category = Category.find(query)
        } else {
            console.log(`getFilterOrders query`, filter)
            //@ts-ignore
            category = Category.find(filter)
        }

        if (category) return category
        else return []
    } catch (error) {
        console.log("Error occured ", error)
        return error
    }
}
