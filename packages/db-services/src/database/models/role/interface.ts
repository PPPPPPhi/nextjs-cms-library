import { Date, ObjectId } from "mongoose"

export type IRoleFunctionType = {
    functionId: ObjectId
    name: string
    description: string
    createdBy: Date
    updatedBy: Date
}

export interface IRole {
    roleName: string
    description: string
    functions_lookUp: Array<IRoleFunctionType | string>
    sites: string[]
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
