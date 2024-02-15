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
    getSelectionList: () => Map<string, SelectionJson>
    getComponentsList: () => Map<string, DragDropJson>
    getPropertiesList: () => Map<string, PropertyJson>
    registerSelectionList: (element: string) => Map<string, SelectionJson>
    registerComponentsList: (element: string) => Map<string, DragDropJson>
    registerPropertiesList: (element: string) => Map<string, PropertyJson>
}

export interface ElementorOperatorType extends OperatorType {
    name: string
}

export interface LayoutOperatorType extends OperatorType {}
