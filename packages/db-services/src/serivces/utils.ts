import { multiSelectFilterField } from "../../../admin-components/src/filter/utils"
import _ from "lodash"

export type FilterOrdersParam = {
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

export const getParsedQuery = (query: FilterOrdersParam) => {
    const parsedQuery = query

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

    return parsedQuery
}
