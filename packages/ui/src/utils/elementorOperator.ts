import { OperatorControlType } from "."
import {
    SelectionJson,
    DragDropJson,
    PropertyJson
} from "./type/componentFormat"

export class ElementorOperator
    implements OperatorControlType.ElementorOperatorType
{
    selectionList: Map<string, SelectionJson>
    componentsList: Map<string, DragDropJson>
    propertiesList: Map<string, PropertyJson>

    constructor() {
        this.selectionList = new Map()
        this.componentsList = new Map()
        this.propertiesList = new Map()
    }

    getAllList() {
        return {
            selection: this.selectionList,
            components: this.componentsList,
            properties: this.propertiesList
        }
    }

    getSelectionList() {
        console.log("getSelectionList")
        return { selectionList: this.selectionList }
    }

    getComponentsList() {
        return {
            componentsList: this.componentsList
        }
    }

    getPropertiesList() {
        return {
            propertiesList: this.propertiesList
        }
    }

    registerSelectionList(element: string) {
        // this.selectionList.push()
        return { selectionList: this.selectionList }
    }

    registerComponentsList(element: string) {
        // this.selectionList.push()
        return {
            componentsList: this.componentsList
        }
    }

    registerPropertiesList(element: string) {
        // this.selectionList.push()
        return {
            propertiesList: this.propertiesList
        }
    }
}
