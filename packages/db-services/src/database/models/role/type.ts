import { Date, ObjectId } from "mongoose"

export type roleFunctionType = {
    functionId: ObjectId
    name: string
    description: string
    createdBy: Date
    updatedBy: Date
}

export type roleType = {
    roleName: string
    description: string
    functions_lookUp: Array<roleFunctionType | string>
    sites: string[]
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
