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
        setDragDropEditList,
        layoutDragDropList,
        setPropertiesEditList
    } = useDisplayPanelContext()

    useEffect(() => {
        console.log(`** GET PAGE DATA **`, !!pageJson)
        console.log("pageJson", pageJson)

        if (dragDropEditList.length > 0) return
        if (!pageJson || _.isEmpty(pageJson) || !_.isArray(pageJson)) {
            setDragDropEditList([])
            setPropertiesEditList([])
            return
        }
        console.log(`[pageData] ** GET PAGE DATA ** `, pageJson, dragDropList)
        const pageDataDragDropList: DragDropComponentProps[] = []
        pageJson?.map((element: PropertyEditType, index: number) => {
            const childDataList: DragDropComponentProps[] = []
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
                        // console.log(`[pageData] new child`, newChild)
                        childDataList.push(newChild)
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

            pageDataDragDropList.push(newDragDropComponent)
        })
        console.log("uppppp 0", pageDataDragDropList)
        console.log("puuuuu 3")

        setDragDropEditList(_.cloneDeep(pageDataDragDropList))
        setPropertiesEditList(_.cloneDeep(pageJson))
    }, [pageJson])
}

export default useDefaultPageHook
