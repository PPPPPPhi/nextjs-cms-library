import { SelectionJson, DragDropJson, PropertyJson } from "./componentFormat"

export interface SelectionListMap {
    selectionList: Map<string, SelectionJson>
}

export interface ComponentsListMap {
    componentsList: Map<string, DragDropJson>
}

export interface PropertiesListMap {
    propertiesList: Map<string, PropertyJson>
}

export interface OperatorType
    extends SelectionListMap,
        ComponentsListMap,
        PropertiesListMap {
    getAllList: () => {
        selection: Map<string, SelectionJson>
        components: Map<string, DragDropJson>
        properties: Map<string, PropertyJson>
    }
    getSelectionList: () => SelectionListMap
    getComponentsList: () => ComponentsListMap
    getPropertiesList: () => PropertiesListMap
    registerSelectionList: (element: string) => SelectionListMap
    registerComponentsList: (element: string) => ComponentsListMap
    registerPropertiesList: (element: string) => PropertiesListMap
}

export interface ElementorOperatorType extends OperatorType {}

export interface LayoutOperatorType extends OperatorType {}
