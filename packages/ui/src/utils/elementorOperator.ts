import { ElementorOperatorType } from "."
import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"
import {
    selectionListMap,
    dragDropListMap,
    propertiesListMap
} from "./ElementsJsonListMap"

export default class _ElementorOperator implements ElementorOperatorType {
    public selectionList: Map<string, SelectionJson>
    public componentsList: Map<string, DragDropJson>
    public propertiesList: Map<string, PropertyJson>

    constructor(name: string) {
        this.name = name
        this.selectionList = selectionListMap
        this.componentsList = dragDropListMap
        this.propertiesList = propertiesListMap
    }
    name: string

    getAllList() {
        return {
            selection: this.selectionList,
            components: this.componentsList,
            properties: this.propertiesList
        }
    }

    getSelectionList() {
        return this.selectionList
    }

    getComponentsList() {
        return this.componentsList
    }

    getPropertiesList() {
        return this.propertiesList
    }

    registerSelectionList(element: string) {
        // this.selectionList.push()
        return this.selectionList
    }

    registerComponentsList(element: string) {
        // this.selectionList.push()
        return this.componentsList
    }

    registerPropertiesList(element: string) {
        // this.selectionList.push()
        return this.propertiesList
    }
}

// export class ElementorOperator {
//     private static instance: _ElementorOperator

//     static getInstance(): _ElementorOperator {
//         if (!ElementorOperator.instance) {
//             ElementorOperator.instance = new _ElementorOperator()
//         }
//         return ElementorOperator.instance
//     }
// }

// export function getElementorInstance() {
//     return new _ElementorOperator()
// }
