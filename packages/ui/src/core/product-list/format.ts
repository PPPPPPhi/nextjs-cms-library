import { SelectionJson, DragDropJson, PropertyJson } from "../utils/type/index"
import { ProductListSvg } from "./svg"
import { ProductList } from "./widget"

export const selectionProductListJson: SelectionJson = {
    element: "product-list",
    icon: ProductListSvg,
    title: "ProductList"
}

export const dragDropProductListJson: DragDropJson = {
    element: "product-list",
    component: ProductList
}

export const propertyProductListJson: PropertyJson = {
    element: "product-list",
    type: "product-list",
    properties: [
        {
            element_id: "product_list_title",
            label: "Title",
            placeholder: "Input here ...",
            value: "Product List Title",
            type: "text"
        },
        {
            element_id: "product_list_card",
            label: "Product List Card",
            placeholder: "",
            //@ts-ignore
            value: [],
            type: "text"
        }
    ]
}
