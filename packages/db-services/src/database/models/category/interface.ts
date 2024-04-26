import { Date } from "mongoose"

export type ICategoryDisplay = {
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

export type ICategoryMappings = {
    discounts: string
    limitedToCustomerRoles: string
    limitedToStores: string
}

export type ICategorySEO = {
    searchEngineFriendlyPageName: string
    metaTitle: string
    metaKeywords: string
    metaDescription: string
}

export type ICateogryProducts = {
    products: string
    productIsFeaturedProduct: boolean
    displayOrder: number
}

export type ICategory = {
    site: string
    name: string
    description: string
    parentCategory: string
    picture: string
    display: ICategoryDisplay
    mappings: ICategoryMappings
    SEO: ICategorySEO
    products: ICateogryProducts
}
