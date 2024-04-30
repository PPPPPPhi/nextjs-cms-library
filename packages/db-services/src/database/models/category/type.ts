import { Date } from "mongoose"

export type categoryDisplayType = {
    published: boolean
    showOnHomePage: boolean
    includeInTopMenu: boolean
    allowCustomersToSelectPageSize: boolean
    pageSizeOptions: string
    priceRangeFiltering: boolean
    enterPriceRangeManually: boolean
    priceFrom: number
    priceTo: number
    displayOrder: number
}

export type categoryMappingsType = {
    discounts: string
    limitedToCustomerRoles: string[]
    limitedToStores: string[]
}

export type categorySEOType = {
    searchEngineFriendlyPageName: string
    metaTitle: string
    metaKeywords: string
    metaDescription: string
}

export type cateogryProductsType = {
    products: string
    productIsFeaturedProduct: boolean
    displayOrder: number
}

export type categoryType = {
    site: string
    name: string
    description: string
    parentCategory: string
    picture: string
    display: categoryDisplayType
    mappings: categoryMappingsType
    SEO: categorySEOType
    products: cateogryProductsType[]
}
