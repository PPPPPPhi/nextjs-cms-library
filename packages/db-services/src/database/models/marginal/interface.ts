import { Date } from "mongoose"

export interface IMarginal {
    site: string
    type: string
    properties: {
        headerLargeLogo: string
        headerSmallLogo: string
        footerHtml: string
        footerCss: string
        footerScript: string
        navJosn: string
    }
    language: string
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}
