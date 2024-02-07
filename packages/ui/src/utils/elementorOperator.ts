export class ElementorOperator {
    private selectionList: []
    private componentsList: []
    private propertiesList: []

    constructor () {
        this.selectionList = []
        this.componentsList = []
        this.propertiesList = []
    }

    getAllList () {
        return {
            selection: this.selectionList,
            components: this.componentsList,
            properties: this.propertiesList
        }
    }

    getSelectionList () {
        console.log('getSelectionList')
        return this.selectionList
    }

    getComponentsList () {
        return this.componentsList 
    }

    getPropertiesList () {
        return this.propertiesList
    }

    registerSelectionList (element: string) {
        // this.selectionList.push()
        return this.selectionList
    }

    registerComponentsList (element: string) {
        // this.selectionList.push()
        return this.selectionList
    }

    registerPropertiesList (element: string) {
        // this.selectionList.push()
        return this.selectionList
    }

}