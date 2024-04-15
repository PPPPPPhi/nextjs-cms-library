export type roleType = {
    description: string
    roleName: string
    functions_lookUp: {
        description: string
        functionId: string
    }[]
    sites: string[]
}

export type authUserType = {
    email: string
    firstName: string
    lastName: string
    userName: string
}
