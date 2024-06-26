import { useEffect, useState } from "react"
import { useAdminNavigationContext } from "../context/AdminNavigationContext"

const useNavigationOffsetHook = (navJson: any, navigation: any) => {
    const [offsetRefList, setOffsetRefList] = useState<number[]>([])
    const [offsetIdRefList, setOffsetIdRefList] = useState<string[]>([])
    const [containerY, setContainerY] = useState(0)

    const { isCollapsing, setOsIdRefList } = useAdminNavigationContext()

    useEffect(() => {
        const DragDropContainer = document.getElementById(
            "navigation-drag-drop-container"
        )
        const adminControlsContainer = document.getElementById(
            "admin_card_container"
        )
        const langControlContainer = document.getElementById(
            "lang_selector_container"
        )

        const recordScrollY = (event: any) => {
            if (DragDropContainer)
                setContainerY(
                    DragDropContainer.scrollTop -
                        adminControlsContainer!.clientHeight ??
                        0 - langControlContainer!.clientHeight ??
                        0
                )
        }

        DragDropContainer?.addEventListener("scroll", recordScrollY)

        return () => {
            DragDropContainer?.removeEventListener("scroll", recordScrollY)
            setContainerY(0)
        }
    }, [])

    useEffect(() => {
        if (!isCollapsing) {
            const AdminNavItems =
                document.getElementsByClassName("AdminNavItem")

            let offsetArray: number[] = []
            let offsetIdArray: string[] = []

            if (AdminNavItems && AdminNavItems.length > 0) {
                Array.apply(null, Array(AdminNavItems.length)).forEach(
                    (l, idx) => {
                        const { top = 0, height = 0 } =
                            AdminNavItems[idx]?.getBoundingClientRect() ?? {}

                        let componentHeight = top + height / 2 + containerY

                        offsetIdArray.push(
                            AdminNavItems[idx]?.getAttribute("ddkey") ?? ""
                        )
                        offsetArray.push(componentHeight)
                    }
                )
            }

            setOffsetRefList(offsetArray)
            setOffsetIdRefList(offsetIdArray)
        }
    }, [navJson, isCollapsing, navigation])

    useEffect(() => {
        setOsIdRefList(offsetIdRefList)
    }, [offsetIdRefList])

    return {
        containerY,
        offsetRefList
    }
}

export default useNavigationOffsetHook
