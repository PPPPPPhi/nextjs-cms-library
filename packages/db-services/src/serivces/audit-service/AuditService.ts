import connectMongoDB from "../../database/connectMongoDB"
import Audit from "../../database/models/audit/Audit"
import User from "../../database/models/user/User"
import Role from "../../database/models/role/Role"
import Function from "../../database/models/function/Function"
import Site from "../../database/models/site/Site"
import SiteSetting from "../../database/models/site-setting/SiteSetting"
import Page from "../../database/models/page/Page"
import Publication from "../../database/models/publication/Publication"
import { Marginal, Navigation } from "../.."
import { getOperatorInfo } from "../auth-service/authService"
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
            const { fullDocument, operationType, ns, _id } = event
            const { userName, id, operatorId } = userInfo

            const userId = userName ?? id ?? operatorId

            // console.log(`[audit] ${ns?.coll} ${operationType}`, event)

            Audit.insertMany([
                {
                    dataId: _id?._data,
                    // @ts-ignore
                    user: userId,
                    category: ns?.coll,
                    action: `${operationType} ${ns?.coll}`,
                    details: fullDocument
                }
            ])
        })
}

export const initAuditWatchHistory = async (user: userSessionType) => {
    try {
        const operator = await getOperatorInfo()
        const { id: operatorId } = operator

        // console.log(`[audit] init watch `, JSON.stringify(operator), operatorId)

        insertAuditLog(Role, { operatorId })
        insertAuditLog(User, { operatorId })
        insertAuditLog(Function, { operatorId })
        insertAuditLog(Site, { operatorId })
        insertAuditLog(SiteSetting, { operatorId })
        insertAuditLog(Page, { operatorId })
        insertAuditLog(Publication, { operatorId })
        insertAuditLog(Marginal, { operatorId })
        insertAuditLog(Navigation, { operatorId })

        return { status: 200 }
    } catch (err) {
        // console.log("Error occured ", err)
        // return { message: "Failed", status: 500 }
    }
}

export const getAuditList = async () => {
    try {
        await connectMongoDB()

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

        const parsedId = new Types.ObjectId(auditId)

        const resp = await getProjectedQuery(
            Audit,
            { user: { $in: [auditId, parsedId] } },
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
