export interface IUser {
    userName: string
    firstName: string
    lastName: string
    password: string
    email: string
    avator: string
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
