import { Date } from "mongoose"
export type IProductTierPrices = {
    store: string
    customerRole: string
    quantity: number
    price: number
    startDate: Date
    endDate: Date
}

export type IProductPrices = {
    price: number
    oldPrice: number
    productCost: number
    disableBuyButton: boolean
    disableWishlistButton: boolean
    availableForPreOrder: boolean
    preOrderAvailabilityStartDate: Date
    callForPrice: boolean
    customerEntersPrice: boolean
    minimumAmount: number
    maximumAmount: number
    pangvBasePriceEnabled: boolean
    amountInProduct: number
    unitOfProduct: number
    referenceAmount: number
    referenceUnit: string
    discounts: Array<string>
    taxExempt: boolean
    taxCategory: string
    telecommunicationsBroadcastingAndElectronicServices: boolean
    tierPrices: IProductTierPrices[]
}

export type IProductShipping = {
    shippingEnabled: boolean
    weight: number
    length: number
    width: number
    height: number
    freeShipping: boolean
    shipSeparately: boolean
    additionalShippingCharge: number
    deliveryDate: Date
}

export type IProductWarehouses = {
    warehouse: string
    use: boolean
    stockQty: number
    reservedQty: number
    plannedQty: number
}

export type IProductInventory = {
    inventoryMethod: string
    isMultipleWarehouses: boolean
    multipleWarehouses: IProductWarehouses[]
    displayAvailability: boolean
    displayStockQuantity: boolean
    minimumStockQty: number
    lowStockActivity: string
    notifyForQtyBelow: number
    backorders: string
    allowBackInStockSubscriptions: boolean
    productAvailabilityRange: string
    minimumCartQty: number
    maximumCartQty: number
    allowedQuantities: string
    notReturnable: boolean
}

export type IProductMultimediaPictures = {
    picture: string
    displayOrder: number
    alt: string
    title: string
}

export type IProductMultimediaVideos = {
    preview: string
    embedVideoURL: string
    displayOrder: string
}

export type IProductMultimedia = {
    pictures: IProductMultimediaPictures[]
    videos: IProductMultimediaVideos[]
}

export type IProductSubAttributes = {
    attribute: string
    textPrompt: string
    isRequired: boolean
    displayOrder: number
    validationRules: Array<string>
    condition: Array<string>
}

export type IProductAttributeCombinations = {
    attributes: Array<string>
    stockQuantity: number
    allowOutOfStock: boolean
    manufacturerPartNumber: string
    GTIN: string
    overriddenPrice: number
    notifyAdminForQuantityBelow: string
    picture: string
}

export type IProductAttributes = {
    attributes: IProductSubAttributes[]
    attributeCombinations: IProductAttributeCombinations[]
}

export type IProductSpecificationAttributes = {
    attributeType: string
    attribute: string
    value: string
    allowFiltering: boolean
    showOnProductPage: boolean
    displayOrder: number
}

export type IProductGiftCard = {
    isGiftCard: boolean
    giftCardType: string
    overriddenGiftCardAmount: number
}

export type IProductDownloadFile = {
    useDownloadURL: boolean
    downloadURL: string
    downloadFileValue: string
}

export type IProductDownloadableProduct = {
    downloadableProduct: boolean
    downloadFile: IProductDownloadFile
    unlimitedDownloads: boolean
    maxDownloads: number
    numberOfDays: number
    downloadActivationType: string
    hasUserAgreement: boolean
    userAgreementText: string
    hasSampleDownloadFile: boolean
    sampleDownloadFile: IProductDownloadFile
}

export type IProductRental = {
    isRental: boolean
    rentalPeriodLength: number
    rentalPeriod: string
}

export type IProductRecurringProduct = {
    isRecurringProduct: boolean
    cycleLength: number
    cyclePeriod: string
    totalCycles: number
}

export type IProductSEO = {
    searchEngineFriendlyPageName: string
    metaTitle: string
    metaKeywords: string
    metaDescription: string
}

export type IProductStockQuantityHistory = {
    warehouse: string
    attributeCombination: string
    quatityAdjustment: number
    stockQuatity: number
    message: string
    createdAt: Date
}

export type IProduct = {
    site: string
    productName: string
    shortDescription: string
    fullDescription: string
    sku: string
    categories: Array<string>
    manufacturers: string
    published: boolean
    productTags: Array<string>
    GTIN: string
    manufacturerPartNumber: string
    showOnHomePage: boolean
    displayOrder: number
    productType: string
    productTemplate: string
    visibleIndividually: boolean
    customerRoles: Array<string>
    limitedToStores: Array<string>
    vendor: string
    requireOtherProducts: boolean
    requiredProductIDs: Array<string>
    automaticallyAddTheseProductsToTheCart: boolean
    allowCustomerReviews: boolean
    availableStartDate: Date
    availableEndDate: Date
    markAsNew: boolean
    markAsNewStartDate: Date
    markAsNewEndDate: Date
    adminComment: string
    prices: IProductPrices
    shipping: IProductShipping
    inventory: IProductInventory
    multimedia: IProductMultimedia
    productAttributes: IProductAttributes
    specificationAttributes: IProductSpecificationAttributes[]
    giftCard: IProductGiftCard
    downloadableProduct: IProductDownloadableProduct
    rental: IProductRental
    recurringProduct: IProductRecurringProduct
    SEO: IProductSEO
    relatedProducts: Array<string>
    crossSells: Array<string>
    purchasedWithOrders: Array<string>
    stockQuantityHistory: IProductStockQuantityHistory[]
}
