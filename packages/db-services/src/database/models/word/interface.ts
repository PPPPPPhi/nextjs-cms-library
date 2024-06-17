export interface IWord {
    site: string
    lang: string
    contents: {
        [key: string]: any
    }
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}
