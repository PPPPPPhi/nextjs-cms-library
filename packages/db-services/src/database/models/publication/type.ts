import { pageType } from "../page/type"

export type publicationType = {
    pageId: string
    pageVersion: string
    name: string
    description: string
    language: string
    siteSlug: string
    slug: string
    status: boolean
    pagePageJson: string
    createdBy: string
    updatedBy: string
    updatedAt: Date
    createdAt: Date
}
