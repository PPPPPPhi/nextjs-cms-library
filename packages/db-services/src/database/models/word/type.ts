export type wordType = {
    _id: string
    site: string
    lang: string
    contents: {
        [key: string]: [value: any]
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
