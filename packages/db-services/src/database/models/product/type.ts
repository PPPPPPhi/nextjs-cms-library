export type productTierPricesType = {
    store: string
    customerRole: string
    quantity: number
    price: number
    startDate: Date
    endDate: Date
}

export type productPricesType = {
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
    tierPrices: productTierPricesType[]
}

export type productShippingType = {
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

export type productWarehousesType = {
    warehouse: string
    use: boolean
    stockQty: number
    reservedQty: number
    plannedQty: number
}

export type productInventoryType = {
    inventoryMethod: string
    isMultipleWarehouses: boolean
    multipleWarehouses: productWarehousesType[]
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

export type productMultimediaPicturesType = {
    picture: string
    displayOrder: number
    alt: string
    title: string
}

export type productMultimediaVideosType = {
    preview: string
    embedVideoURL: string
    displayOrder: string
}

export type productMultimediaType = {
    pictures: productMultimediaPicturesType[]
    videos: productMultimediaVideosType[]
}

export type productSubAttributesType = {
    attribute: string
    textPrompt: string
    isRequired: boolean
    displayOrder: number
    validationRules: Array<string>
    condition: Array<string>
}

export type productAttributeCombinationsType = {
    attributes: Array<string>
    stockQuantity: number
    allowOutOfStock: boolean
    manufacturerPartNumber: string
    GTIN: string
    overriddenPrice: number
    notifyAdminForQuantityBelow: string
    picture: string
}

export type productAttributesType = {
    attributes: productSubAttributesType[]
    attributeCombinations: productAttributeCombinationsType[]
}

export type productSpecificationAttributesType = {
    attributeType: string
    attribute: string
    value: string
    allowFiltering: boolean
    showOnProductPage: boolean
    displayOrder: number
}

export type productGiftCardType = {
    isGiftCard: boolean
    giftCardType: string
    overriddenGiftCardAmount: number
}

export type productDownloadFileType = {
    useDownloadURL: boolean
    downloadURL: string
    downloadFileValue: string
}

export type productDownloadableProductType = {
    downloadableProduct: boolean
    downloadFile: productDownloadFileType
    unlimitedDownloads: boolean
    maxDownloads: number
    numberOfDays: number
    downloadActivationType: string
    hasUserAgreement: boolean
    userAgreementText: string
    hasSampleDownloadFile: boolean
    sampleDownloadFile: productDownloadFileType
}

export type productRentalType = {
    isRental: boolean
    rentalPeriodLength: number
    rentalPeriod: string
}

export type productRecurringProductType = {
    isRecurringProduct: boolean
    cycleLength: number
    cyclePeriod: string
    totalCycles: number
}

export type productSEOType = {
    searchEngineFriendlyPageName: string
    metaTitle: string
    metaKeywords: string
    metaDescription: string
}

export type productStockQuantityHistoryType = {
    warehouse: string
    attributeCombination: string
    quatityAdjustment: number
    stockQuatity: number
    message: string
    createdAt: Date
}

export type productType = {
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
    prices: productPricesType
    shipping: productShippingType
    inventory: productInventoryType
    multimedia: productMultimediaType
    productAttributes: productAttributesType
    specificationAttributes: productSpecificationAttributesType[]
    giftCard: productGiftCardType
    downloadableProduct: productDownloadableProductType
    rental: productRentalType
    recurringProduct: productRecurringProductType
    SEO: productSEOType
    relatedProducts: Array<string>
    crossSells: Array<string>
    purchasedWithOrders: Array<string>
    stockQuantityHistory: productStockQuantityHistoryType[]
}
