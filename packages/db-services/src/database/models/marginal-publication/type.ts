import { Date } from "mongoose"

export type marginalPublicationType = {
    site: string
    type: string
    properties: {
        headerLargeRatio: string
        headerSmallRatio: string
        headerLargeLogo: string
        headerSmallLogo: string
        footerHtml: string
        footerCss: string
        footerScript: string
        navJosn: string
    }
    language: string
    marginalVersion: string
    createdBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}
