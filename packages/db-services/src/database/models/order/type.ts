export type orderAddressType = {
    fullName: string
    email: string
    phone: number
    fax: string
    company: string
    address1: string
    address2: string
    city: string
    countyRegion: string
    stateProvince: string
    zipPostalCode: string
    country: string
}

export type orderBillingAndShippingType = {
    billingAddress: orderAddressType
    shippingAddress: orderAddressType
    shippingMethod: string
    shippingStatus: string
}

export type orderProductsType = {
    picture: string
    productName: string
    productSKU: string
    price: number
    quantity: number
    discount: number
    total: number
}

export type orderNotesType = {
    createdAt: Date
    note: string
    attachedFile: string
    displayToCustomer: boolean
}

export type OrderType = {
    order: string
    createdAt: Date
    customer: string
    orderStatus: string
    orderSubtotal: number
    orderShipping: number
    orderTax: number
    orderTotal: number
    profit: number
    paymentMethod: string
    paymentStatus: string
    store: string
    orderGUID: string
    customerIpAddress: string

    billingAndShipping: orderBillingAndShippingType
    products: orderProductsType[]
    orderNotes: orderNotesType[]
}
