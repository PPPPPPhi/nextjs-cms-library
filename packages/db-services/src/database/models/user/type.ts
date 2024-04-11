export type userType = {
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

export type userRegType = {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
}
