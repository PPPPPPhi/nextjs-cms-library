export type IOrderAddress = {
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

export type IOrderBillingAndShipping = {
    billingAddress: IOrderAddress
    shippingAddress: IOrderAddress
    shippingMethod: string
    shippingStatus: string
}

export type IOrderProducts = {
    picture: string
    productName: string
    productSKU: string
    price: number
    quantity: number
    discount: number
    total: number
}

export type IOrderNotes = {
    createdAt: Date
    note: string
    attachedFile: string
    displayToCustomer: boolean
}

export type IOrder = {
    site: string
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
    billingAndShipping: IOrderBillingAndShipping
    products: IOrderProducts[]
    orderNotes: IOrderNotes[]
}
