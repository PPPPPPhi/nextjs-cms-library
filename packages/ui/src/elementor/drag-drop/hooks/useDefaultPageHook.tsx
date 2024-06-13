import { useEffect } from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import * as _ from "lodash"
import {
    DragDropJson,
    PropertyJson,
    DragDropComponentProps,
    PropertiesComponentProps
} from "@nextjs-cms-library/ui/index"
import { PropertyEditType } from "../../../utils"

const useDefaultPageHook = (pageJson: PropertiesComponentProps | {}) => {
    const {
        dragDropEditList,
        dragDropList,
        propertiesList,
        setDragDropEditList,
        layoutDragDropList,
        layoutPropertiesList,
        setPropertiesEditList
    } = useDisplayPanelContext()

    useEffect(() => {
        if (dragDropEditList.length > 0) return
        if (!pageJson || _.isEmpty(pageJson) || !_.isArray(pageJson)) {
            setDragDropEditList([])
            setPropertiesEditList([])
            return
        }
        const newPList = _.cloneDeep(propertiesList)

        const pageDataDragDropList: DragDropComponentProps[] = []
        const pageDataPropertyList: PropertiesComponentProps[] = []

        pageJson?.map((element: PropertyEditType, index: number) => {
            const childDataList: DragDropComponentProps[] = []
            const childPropList: PropertiesComponentProps[] = []

            if (element?.children) {
                element?.children?.map(
                    (element: PropertyJson, index: number) => {
                        //@ts-ignore
                        const newChild: DragDropComponentProps = {
                            ...(dragDropList?.get(
                                element?.element
                            ) as DragDropJson),
                            id: element?.id ?? ""
                        }
                        childDataList.push(newChild)

                        //@ts-ignore
                        const newProps: PropertiesComponentProps = {
                            ...(newPList?.get(
                                element?.element
                            ) as PropertyJson),
                            id: element?.id ?? "",
                            properties: (
                                newPList?.get(element?.element) as PropertyJson
                            )?.properties?.map((l) => ({
                                ...l,
                                value: _.cloneDeep(element?.properties)?.find(
                                    (k) => k.element_id === l.element_id
                                )?.value
                            })),
                            childType: element.childType
                        }
                        childPropList.push(newProps)
                    }
                )
            }
            //@ts-ignore
            const newDragDropComponent: DragDropComponentProps = {
                ...((dragDropList?.get(element?.element) as DragDropJson) ??
                    (layoutDragDropList?.get(
                        element?.element
                    ) as DragDropJson)),
                id: element?.id,
                elements: childDataList ?? []
            }

            const selfProps =
                (newPList?.get(element?.element) as PropertyJson) ??
                (_.cloneDeep(layoutPropertiesList)?.get(
                    element?.element
                ) as PropertyJson)

            const newPropertyComponent: any = {
                ...selfProps,
                id: element?.id,
                properties: selfProps?.properties?.map((l) => ({
                    ...l,
                    value: _.cloneDeep(element?.properties)?.find(
                        (k) => k.element_id === l.element_id
                    )?.value
                })),
                children: childPropList ?? []
            }

            pageDataDragDropList.push(newDragDropComponent)
            pageDataPropertyList.push(newPropertyComponent)
        })

        setDragDropEditList(_.cloneDeep(pageDataDragDropList))
        setPropertiesEditList(_.cloneDeep(pageDataPropertyList))
    }, [pageJson])
}

export default useDefaultPageHook
