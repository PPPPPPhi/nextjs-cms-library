import connectMongoDB from "../../database/connectMongoDB"
import Audit from "../../database/models/audit/Audit"
import User from "../../database/models/user/User"
import Role from "../../database/models/role/Role"
import Function from "../../database/models/function/Function"
import Site from "../../database/models/site/Site"
import SiteSetting from "../../database/models/site-setting/SiteSetting"
import Page from "../../database/models/page/Page"
import Publication from "../../database/models/publication/Publication"
import { getOperator, getOperatorId } from "../auth-service/authService"
import { initializeFunction } from "../function-service/FunctionService"
import { Model, Types } from "mongoose"
import { getProjectedQuery, userSessionType } from "../utils"
import { firstValueFrom, forkJoin, of, switchMap } from "rxjs"

type auditType = {
    auditName: string
    description: string
    functions: string[]
    sites: string[]
}

type auditUserType = {
    operatorId: string
    userName?: string
    id?: string
}

const insertAuditLog = (
    model: Model<any, {}, {}, {}, any, any>,
    userInfo: auditUserType
) => {
    model
        .watch([], { fullDocument: "updateLookup" })
        .on("change", (event: any) => {
            console.log(`[audit] ROLE`, event)

            const { fullDocument, ns, _id } = event
            const { userName, id, operatorId } = userInfo

            const userId = new Types.ObjectId(userName ?? id ?? operatorId)

            Audit.insertMany([
                {
                    dataId: _id?._data,
                    user_fk: userId,
                    category: ns?.coll,
                    action: fullDocument
                }
            ])
        })
}

export const initAuditWatchHistory = async (user: userSessionType) => {
    try {
        const operatorId = await getOperatorId()
        const { id, userName } = user ?? {}

        console.log(`[audit] init watch `, userName, id, operatorId)

        insertAuditLog(Role, { operatorId, userName, id })
        insertAuditLog(User, { operatorId, userName, id })
        insertAuditLog(Function, { operatorId, userName, id })
        insertAuditLog(Site, { operatorId, userName, id })
        insertAuditLog(SiteSetting, { operatorId, userName, id })
        insertAuditLog(Page, { operatorId, userName, id })
        insertAuditLog(Publication, { operatorId, userName, id })

        return { status: 200 }
    } catch (err) {
        console.log("Error occured ", err)
        return { message: "Failed", status: 500 }
    }
}

export const getAuditList = async () => {
    try {
        await connectMongoDB()

        // const audits = await Audit.aggregate([
        //     { $unwind: "$functions_lookUp" },
        //     {
        //         $lookup: {
        //             from: "functions",
        //             localField: "functions_lookUp",
        //             foreignField: "_id",
        //             as: "functionItem"
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$_id",
        //             details: { $push: "$$ROOT" }
        //         }
        //     }
        // ])

        // const reformatted = (audits || []).map((k) => {
        //     return {
        //         _id: k._id,
        //         name: k.details[0].name,
        //         sites: k.details[0].sites,
        //         description: k.details[0].description,
        //         functions: (k.details || []).map(
        //             (l: {
        //                 functionItem: {
        //                     _id: string
        //                     name: string
        //                     description: string
        //                 }[]
        //             }) => {
        //                 return {
        //                     functionId: l.functionItem[0]?._id,
        //                     functionName: l.functionItem[0]?.name,
        //                     functionDescription: l.functionItem[0]?.description
        //                 }
        //             }
        //         )
        //     }
        // })

        const getAudits = await getProjectedQuery(
            Audit,
            { _id: { $exists: true } },
            [],
            [
                "auditName",
                "description",
                "sites",
                "functions_lookUp.functionId",
                "functions_lookUp.name",
                "functions_lookUp.description"
            ]
        )

        console.log(`[getProjectedQuery] getAudits`, JSON.stringify(getAudits))
        return { message: "Success", status: 200, audits: getAudits ?? [] }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getAuditRecordByUser = async (auditId: string) => {
    try {
        await connectMongoDB()

        const userId = new Types.ObjectId(auditId)

        const resp = await getProjectedQuery(
            Audit,
            { user_fk: userId },
            [],
            ["dataId", "user", "category", "action", "updatedAt"]
        )

        if (resp) return { message: "Success", status: 200, audits: resp ?? [] }
        else throw new Error("Error in updating audit")
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}
