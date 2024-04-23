import { getOperatorInfo } from "../auth-service/authService"
import { Model, Types } from "mongoose"
import { getProjectedQuery, userSessionType } from "../utils"
import { connectMongoDB } from "../.."

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
        .on("change", async (event: any) => {
            const { fullDocument, operationType, ns, _id } = event
            const { userName, id, operatorId } = userInfo

            const mongoose = await connectMongoDB()

            const userId = userName ?? id ?? operatorId

            // console.log(`[audit] ${ns?.coll} ${operationType}`, event)

            ;(
                mongoose.models.Audit as Model<any, {}, {}, {}, any, any>
            ).insertMany([
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

        const mongoose = await connectMongoDB()

        // console.log(`[audit] init watch `, JSON.stringify(operator), operatorId)

        // insertAuditLog(
        //     mongoose.models.Role as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.User as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.Function as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.Site as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.SiteSetting as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.Page as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.Publication as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )
        // insertAuditLog(
        //     mongoose.models.Marginal as Model<any, {}, {}, {}, any, any>,
        //     { operatorId }
        // )

        return { status: 200 }
    } catch (err) {
        // console.log("Error occured ", err)
        // return { message: "Failed", status: 500 }
    }
}

export const getAuditList = async () => {
    try {
        const mongoose = await connectMongoDB()

        const getAudits = await getProjectedQuery(
            mongoose.models.Audit as Model<any, {}, {}, {}, any, any>,
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

        // console.log(`[getProjectedQuery] getAudits`, JSON.stringify(getAudits))
        return { message: "Success", status: 200, audits: getAudits ?? [] }
    } catch (error) {
        console.log("Error occured ", error)
        return { message: "Failed", status: 500 }
    }
}

export const getAuditRecordByUser = async (auditId: string) => {
    try {
        const mongoose = await connectMongoDB()

        const parsedId = new Types.ObjectId(auditId)

        const resp = await getProjectedQuery(
            mongoose.models.Audit as Model<any, {}, {}, {}, any, any>,
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
