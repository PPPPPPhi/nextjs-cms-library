import { useRef, useState, useCallback, useEffect } from "react"
import { AdminNavButton } from "./AdminNavButton"
import { HiFolderAdd } from "react-icons/hi"
import { AdminCreateNavItemForm } from "../form"
import * as _ from "lodash"
import { AdminCard } from "../core"
import { AdminNavigationItem } from "./AdminNavigationItem"
import useNavigationOffsetHook from "./hooks/useNavigationOffsetHook"
import { useAdminNavigationContext } from "./context/AdminNavigationContext"
const { useDrop } = require("react-dnd")

export type naviagtionType = {
    name: string
    url: string
    target: "_blank" | "_self"
    children?: naviagtionType[]
    level?: number
}

interface AdminNavigationDisplayInterface {
    navJson: naviagtionType[]
    saveNav: (n: naviagtionType[]) => void
    setModal: (details: any) => void
}

export const AdminNavigationDisplay: React.FC<
    AdminNavigationDisplayInterface
> = ({ navJson, saveNav, setModal }) => {
    const formRef = useRef<any>()

    const [navigation, setNavigation] = useState<naviagtionType[]>(navJson)
    const {
        isDraggable,
        setIsDraggable,
        isShowSetting,
        setIsShowSetting,
        setIsCollapsing,
        osPosition,
        setOsPosition
    } = useAdminNavigationContext()

    const { offsetRefList, containerY } = useNavigationOffsetHook(navJson)

    useEffect(() => {
        console.log("navJson", navJson)
        setNavigation(navJson)
    }, [navJson])

    const [{}, drop] = useDrop(
        () => ({
            accept: "collapsible_menu",
            hover: (item: any, monitor: any) => {
                const { y: clientOffset } = monitor.getClientOffset()
                const offsetIdx = offsetRefList.findIndex(
                    (l) => l > clientOffset + containerY
                )

                const htmlPosiion =
                    offsetIdx === -1 ? offsetRefList.length - 1 : offsetIdx - 1
                setOsPosition(htmlPosiion)
            },
            drop: (_item: any, monitor: any) => {
                setOsPosition(-99)
            },
            collect: (monitor: any) => ({
                isDragging: monitor.isOver()
            })
        }),
        [offsetRefList]
    )

    const createNewNavItem = (refIdx: number[]) => {
        setModal({
            title: "Create New Language",
            content: (
                <AdminCreateNavItemForm
                    onFormValueChange={(v) => {
                        formRef.current = v
                    }}
                />
            ),
            confirmCTAText: "Confirm",
            confirmHandler: () => {
                const { name, url, target } = formRef.current

                addNavItem(refIdx, {
                    name,
                    url,
                    target
                })
            },
            cancelCTAText: "Cancel"
        })
    }

    const editNavItem = (refIdx: number[]) => {
        const navList = [...navigation]
        let editItem = getNavItem(refIdx)

        setModal({
            title: "Edit Nav Item",
            content: (
                <AdminCreateNavItemForm
                    defaultValue={editItem as naviagtionType}
                    onFormValueChange={(v) => {
                        formRef.current = v
                    }}
                />
            ),
            confirmCTAText: "Confirm",
            confirmHandler: () => {
                const { name, url, target } = formRef.current
                const editPath = refIdx.map((l, idx) => {
                    if (idx === 0) return `[${l}]`
                    else return `children[${l}]`
                })

                _.set(navList, editPath.join("."), {
                    ...editItem,
                    name,
                    url,
                    target
                })

                setNavigation(navList)
            },
            cancelCTAText: "Cancel"
        })
    }

    const getNavItem = (refIdx: number[]) => {
        const navList = [...navigation]
        let navLevelItem: any = []

        if (refIdx.length === 1) {
            navLevelItem = navList[refIdx[0] as number] as naviagtionType
        } else {
            refIdx.forEach((k, idx) => {
                if (idx === 0) {
                    navLevelItem = navList[k] as naviagtionType
                } else {
                    navLevelItem = navLevelItem.children[k] as naviagtionType
                }
            })
        }

        return navLevelItem
    }

    const addNavItem = (refIdx: number[], nav: naviagtionType) => {
        let navList = [...navigation]
        let navLevelItem: any = []

        console.log("refIdx", refIdx)

        if (refIdx.length === 0) {
            navList.push({ ...nav, children: [] })
        } else {
            refIdx.forEach((k, idx) => {
                if (idx === 0) {
                    navLevelItem = navList[k]?.children as naviagtionType[]
                } else {
                    navLevelItem = (navLevelItem as naviagtionType[])[
                        k
                    ] as naviagtionType
                }
            })

            if (refIdx.length === 1) navLevelItem.push(nav)
            else if ((navLevelItem as naviagtionType).children) {
                ;(navLevelItem as naviagtionType)?.children?.push(nav)
            } else {
                ;(navLevelItem as naviagtionType).children = [nav]
            }
        }

        setNavigation(navList)
    }

    const removeNavItem = (refIdx: number[]) => {
        let navList = [...navigation]
        let navLevelItem: any = []

        if (refIdx.length === 1) {
            navList.splice(refIdx[0] as number, 1)
        } else {
            refIdx.forEach((k, idx) => {
                if (idx === 0) {
                    navLevelItem = navList[k] as naviagtionType
                } else if (idx === refIdx.length - 1) {
                    return
                } else {
                    navLevelItem = navLevelItem.children[k] as naviagtionType
                }
            })
            navLevelItem.children.splice(refIdx[refIdx.length - 1], 1)
        }

        setNavigation(navList)
    }

    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex pb-3">
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: "Move Position",
                            desc: "Move Position",
                            action: () => {
                                setIsCollapsing(!isDraggable ? true : false)
                                setIsDraggable(!isDraggable)
                            }
                        },
                        {
                            actionLabel: "Show / Hide Setting",
                            desc: "Show/Hide setting for editing/viewing the navigation menu",
                            action: () => {
                                setIsShowSetting(!isShowSetting)
                            }
                        },
                        {
                            actionLabel: "Save",
                            desc: "Save existing navigation to your site",
                            action: () => {
                                saveNav(navigation)
                            }
                        }
                    ]}
                />
            </div>
            <AdminNavButton
                icon={<HiFolderAdd />}
                label={"Main Navigation"}
                onNavClick={() => {
                    createNewNavItem([])
                }}
                disabled={!isShowSetting}
            />
            <div className="d-flex flex-column w-100" ref={drop}>
                {navigation.map((k, idx) => (
                    <AdminNavigationItem
                        key={`collapsed_${idx}`}
                        id={`collapsed_parent_${idx}`}
                        navItem={k}
                        idx={idx}
                        refIdx={[idx]}
                        onAddNavItem={(r) => {
                            createNewNavItem(r)
                        }}
                        onEditNavItem={(r) => {
                            editNavItem(r)
                        }}
                        onRemoveNavItem={(r) => {
                            removeNavItem(r)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
