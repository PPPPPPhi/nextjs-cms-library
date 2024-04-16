import mongoose, { Model } from "mongoose"
import _ from "lodash"
import { firstValueFrom, forkJoin, of, switchMap } from "rxjs"

export type userSessionType = {
    id?: string
    email?: string
    roles?: string
    userName?: string
    firstName?: string
    lastName?: string
    password?: string
}

export const multiSelectFilterField = ["orderStatus", "paymentStatus"]

export type FilterOrdersParam = {
    id?: string | undefined
    pageNum?: string | undefined
    pageSize?: string | undefined
    category?: string | undefined
    product?: string | undefined
    amount?: string | undefined
    stock?: string | undefined
    description?: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
    orderStatus?: string | undefined
    paymentStatus?: string | undefined
    customerId?: string | undefined
    total?: string | undefined
    remark?: string | undefined
    pickUp?: string | undefined
    orderAddress?: string | undefined
}

const PROJECT_ALL_KEY = "document"

export type FilterQueryParam = { [s: string]: any }

export type FilterProjectParam = {
    from: string
    to: string
}

export enum QueryOperatior {
    MATCH = "$match",
    ADDTOSET = "$addToSet",
    PULL = "$pull",
    SET = "$set",
    CREATE = "CREATE",
    UPDATE = "UPDATE"
}

export const useQueryOperatorFilter = (
    queryFilter: Object,
    operation: string,
    key: string,
    data: any
) => {
    switch (operation) {
        case QueryOperatior.ADDTOSET:
            _.set(queryFilter, `${operation}.${key}`, { $each: data })
            break
        case QueryOperatior.PULL:
            _.set(queryFilter, `${operation}.${key}`, { $in: data })
            break
        case QueryOperatior.MATCH:
            _.set(queryFilter, `${operation}.${key}`, { $exists: true })
            break
        case QueryOperatior.SET:
            queryFilter = data
            break
        case QueryOperatior.CREATE:
            break
        default:
            break
    }

    return queryFilter
}

export type PaginatedParam = {
    searchBefore?: string | undefined
    searchAfter?: string | undefined
    pageSize?: string | undefined
    pageNum?: string | undefined
}

export const getParsedQuery = (query: FilterOrdersParam) => {
    const parsedQuery = _.cloneDeep(query)

    multiSelectFilterField.forEach((key: string) => {
        // @ts-ignore
        const value = query?.[key as string]

        if (!value) return

        _.set(parsedQuery, key, {
            // @ts-ignore
            $in: query?.[key]?.split(",")
        })

        return
    })

    if (query?.startDate && query?.endDate) {
        _.set(query, `createdAt`, {
            $gte: new Date(query?.startDate),
            $lte: new Date(query?.endDate)
        })

        _.unset(parsedQuery, `startDate`)
        _.unset(parsedQuery, `endDate`)
    }

    _.unset(parsedQuery, `pageNum`)
    _.unset(parsedQuery, `pageSize`)

    return parsedQuery
}

export const getPaginatedQuery = (
    model: Model<any, {}, {}, {}, any, any>,
    param: PaginatedParam, // pagination param from router query
    filter: FilterOrdersParam, // find or findOne filter can pass here
    stage: any // other aggregation stage
) => {
    try {
        let res

        const skip =
            parseInt(param?.pageSize ?? "") * parseInt(param?.pageNum ?? "")

        const limit = parseInt(param?.pageSize ?? "")

        const aggregation = [
            { $match: filter },
            { $skip: !_.isNaN(skip) ? skip : 0 },
            { $limit: !_.isNaN(limit) ? limit : 10 }
        ]

        console.log(`aggregation`, aggregation)

        if (!stage) {
            res = model.aggregate(aggregation)
        } else {
            res = model.aggregate(stage.concat(aggregation))
        }

        return res
    } catch (error) {
        console.log(`Error occur: `, error)
    }
}

export const getProjectedQuery = async (
    model: Model<any, {}, {}, {}, any, any>,
    // param: PaginatedParam, // pagination param from router query
    filter: FilterQueryParam, // find or findOne filter can pass here
    stage: any, // other aggregation stage,
    projectFields: string[],
    renameFields?: FilterProjectParam[]
) => {
    try {
        let res
        let pipeline: Array<any> = []

        const filterPipeline = [{ $match: filter }]

        if (stage) {
            pipeline = stage.concat(filterPipeline)
        }

        const projectFilter = { _id: 0 }

        projectFields?.map((key: string) => {
            if (key == PROJECT_ALL_KEY) {
                return
            } else {
                _.set(projectFilter, key, 1)
            }
        })

        if (Object.keys(projectFilter).length > 1 && pipeline) {
            const projectPipeline = {
                $project: projectFilter
            }

            pipeline.push(projectPipeline)
        }

        if (renameFields?.length != 0 && renameFields) {
            const renameFilter = {}
            const unsetKeyFilter: string[] = []

            renameFields?.map((param: FilterProjectParam) => {
                const { from, to } = param

                _.set(renameFilter, to, `$${from}`)
                unsetKeyFilter.push(from)
            })

            pipeline.push(
                {
                    $addFields: renameFilter
                },
                {
                    $unset: unsetKeyFilter
                }
            )
        }

        console.log(`[getProjectedQuery] pipeline`, JSON.stringify(pipeline))
        res = await model.aggregate(pipeline)

        console.log(`[getProjectedQuery] res`, JSON.stringify(res))

        return res
    } catch (error) {
        console.log(`Error occur: `, error)
    }
}

export const getMergedQueryRes = (data: { primary: any; secondary: any }) => {
    const { primary, secondary } = data
    const res: FilterQueryParam[] = []

    const primaryData = _.cloneDeep(primary[0])

    secondary.map((data: FilterQueryParam) => {
        res.push({ ...primaryData, ...data })
    })

    return res
}

export const getUpdateDocumentQuery = async (
    model: Model<any, {}, {}, {}, any, any>,
    // param: PaginatedParam, // pagination param from router query
    filter: FilterQueryParam, // find or findOne filter can pass here
    operation: FilterQueryParam // other aggregation stage,
    // projectFields: string[]
) => {
    try {
        const res = model.updateMany(filter, operation)

        return res
    } catch (error) {
        console.log(`Error occur: `, error)
    }
}

export type UpdateDocumentHistoryRemark = {
    event?: string
    type?: string
    method?: string
}

/**
 * for create new document (e.g. user/ role)
 * or update single document
 */
export const getUpsertSingleDocumentQuery = async (
    operation: string,
    operator: {
        name?: string
        id?: string
        reason?: string
        historyData?: any
    },
    model: Model<any, {}, {}, {}, any, any>,
    filter: FilterQueryParam,
    data: any
) => {
    const { name, id, reason, historyData } = operator

    const updateFilter = filter ?? {}

    console.log(`[upsert] updateQuery`, data)

    const updateQuery = {
        $set: data
    }

    console.log(`[upsert] filter`, operation, updateFilter, updateQuery)

    const updateDocument = model.findOneAndUpdate(updateFilter, updateQuery, {
        new: true,
        upsert: true
    })

    const query = forkJoin([updateDocument]).pipe(
        switchMap((res: any) => {
            const [data = res[0]] = res

            console.log(`[query] res`, res)

            if (!data) throw new Error("Error in updating data")

            const { event, type, method } = historyData

            data.updatedAt = data?.updatedAt
            ;(data.updatedBy = name ?? "GUEST"),
                (data.__history = {
                    event: event ?? "",
                    user: id ?? res?.id, // An object id of the user that generate the event
                    reason: reason ?? undefined,
                    data: historyData ?? undefined, // Additional data to save with the event
                    type: type ?? "", // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
                    method: method ?? "" // Optional and intended for method reference
                })

            return of(data.save())
        })
    )

    const res = await firstValueFrom(query)
    return res
}
