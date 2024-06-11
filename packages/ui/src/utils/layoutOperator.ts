import { LayoutOperatorType } from "."
import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

import {
    selectionLayoutMap,
    dragDropLayoutMap,
    propertiesLayoutMap
} from "./LayoutJsonListMap"

export class LayoutOperator implements LayoutOperatorType {
    selectionList: Map<string, SelectionJson>
    componentsList: Map<string, DragDropJson>
    propertiesList: Map<string, PropertyJson>

    constructor() {
        this.selectionList = selectionLayoutMap
        this.componentsList = dragDropLayoutMap
        this.propertiesList = propertiesLayoutMap
    }

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
