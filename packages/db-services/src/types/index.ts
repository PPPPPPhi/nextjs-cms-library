export type historySchemaType<T> = {
    getVersions: () => historyType<T>[]
    getVersion: (ver: string) => historyType<T>
    getDiffs: (query: diffParamType) => historyType<T>[]
    __history: __historyType
    save: () => T
}

export type __historyType = {
    event: string
    user: string
    reason?: string
    data?: string
    type: string
    method: string
}

export type historyType<T> = {
    event: string
    user: string
    reason: string
    data: string
    type: string
    method: string
    version: string
    object: T
}

export type diffParamType = {
    find?: any
    select?: any
    sort?: string
    populate?: string
    limit?: number
}
