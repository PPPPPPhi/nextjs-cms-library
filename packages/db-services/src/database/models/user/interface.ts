import { Date } from "mongoose"

export interface IUser {
    userName: string
    firstName: string
    lastName: string
    password: string
    email: string
    avator: string
    sites: []
    roles: []
    status: number
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}

export interface UserMethods {
    isValidPassword: (password: string) => Promise<boolean>
}
