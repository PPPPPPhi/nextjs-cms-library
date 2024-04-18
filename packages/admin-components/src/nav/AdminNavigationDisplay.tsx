import { useRef, useState, useMemo, useEffect } from "react"
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

const MAX_LEVEL = 3

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
        osIdRefList,
        setOsPosition
    } = useAdminNavigationContext()

    const { offsetRefList, containerY } = useNavigationOffsetHook(
        navJson,
        navigation
    )
    const navigationRef = useRef<any>()

    useEffect(() => {
        setNavigation(navJson)
    }, [navJson])

    useEffect(() => {
        navigationRef.current = navigation
    }, [navigation])

    const updateNavLevel = (itemId: string, position: number) => {
        const nJsonList = _.cloneDeep(navigationRef.current)
        const flattenDeepList: any[] = []

        const isNewAdding = position === osIdRefList.length

        const recursionNav = (list: any, idx?: number, groupIdx?: number) => {
            list.forEach((l: naviagtionType, parentIdx: number) => {
                flattenDeepList.push({
                    ...l,
                    level: idx ?? 0,
                    group: groupIdx ?? parentIdx
                })
                if (l.children) {
                    recursionNav(
                        l.children,
                        (idx ?? 0) + 1,
                        groupIdx ?? parentIdx
                    )
                }
            })
        }

        recursionNav(nJsonList)

        const clonedDeepList = _.cloneDeep(flattenDeepList)

        const currentIdx = osIdRefList.findIndex((l) => l === itemId)
        const currentChild = clonedDeepList[currentIdx]
        const elemenlatorIdx =
            currentIdx > position ? currentIdx + 1 : currentIdx
        const peerLevel = isNewAdding
            ? 0
            : clonedDeepList[position - 1].level + 1
        const peerGroup = isNewAdding
            ? clonedDeepList[position - 2].group + 1
            : clonedDeepList[position - 1].group

        // if (peerLevel >= MAX_LEVEL) return

        const newFlattenDeepList = _.cloneDeep(clonedDeepList)
        newFlattenDeepList.splice(isNewAdding ? position - 1 : position, 0, {
            ...currentChild,
            level: peerLevel,
            group: peerGroup
        })
        newFlattenDeepList.splice(elemenlatorIdx, 1)

        const groupedList = _.groupBy(newFlattenDeepList, "group")
        const resultNavJson: any[] = []

        const findChildren = (list: any[], count: number, src?: any[]): any => {
            if (count === 1) {
                if (list[list.length - 1]?.children)
                    return list[list.length - 1]?.children
                else if (src) {
                    return (
                        list[list.length - 1]?.children ??
                        src[src.length - 1]?.children
                    )
                } else return []
            } else
                return findChildren(
                    list[list.length - 1].children,
                    count - 1,
                    list
                )
        }

        Object.keys(groupedList).forEach((l, indx) => {
            let initialLevel = 0

            groupedList[l]?.forEach((k, idx) => {
                if (idx === 0) {
                    initialLevel = k.level
                    resultNavJson.push(
                        _.omitBy({ ...k, children: [] }, _.isNumber)
                    )
                } else if (k.level === initialLevel) {
                    resultNavJson.push(
                        _.omitBy({ ...k, children: [] }, _.isNumber)
                    )
                } else {
                    const parent = findChildren(
                        resultNavJson,
                        k.level - initialLevel
                    )
                    parent.push(_.omitBy({ ...k, children: [] }, _.isNumber))
                }
            })
        })

        const result = _.cloneDeep(resultNavJson)
        setNavigation(result)
    }

    const updateNavParentLevel = (position: number, action: "u" | "d") => {
        const nJsonList = _.cloneDeep(navigationRef.current)
        const targetPosition = action === "u" ? position - 1 : position + 2
        const elemenlatorIdx = action === "u" ? position + 1 : position

        const currentChild = nJsonList[position]

        nJsonList.splice(targetPosition, 0, {
            ...currentChild
        })
        nJsonList.splice(elemenlatorIdx, 1)
        setNavigation(_.cloneDeep(nJsonList))
    }

    const [{}, drop] = useDrop(
        () => ({
            accept: "collapsible_menu",
            hover: (item: any, monitor: any) => {
                const { y: clientOffset } = monitor.getClientOffset()
                const offsetIdx = offsetRefList.findIndex(
                    (l) => l > clientOffset + containerY
                )

                const htmlPosition =
                    offsetIdx === -1 ? offsetRefList.length - 1 : offsetIdx - 1
                setOsPosition(htmlPosition)
            },
            drop: (_item: any, monitor: any) => {
                const { y: clientOffset } = monitor.getClientOffset()
                const offsetIdx = offsetRefList.findIndex(
                    (l) => l > clientOffset + containerY
                )
                const htmlPosition =
                    offsetIdx === -1 ? offsetRefList.length : offsetIdx

                setOsPosition(-99)
                updateNavLevel(_item.id, htmlPosition)
            },
            collect: (monitor: any) => ({
                isDragging: monitor.isOver()
            })
        }),
        [offsetRefList, osIdRefList]
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

    const isOuterMost = useMemo(() => {
        if (osIdRefList.length - 1 === osPosition) return true
        else return false
    }, [osPosition, osIdRefList])

    const cardsRef = useMemo(() => {
        const navCard = [
            {
                actionLabel: "Move Position",
                desc: "Move Position",
                action: () => {
                    setIsCollapsing(!isDraggable ? true : false)
                    setIsDraggable(!isDraggable)
                },
                authCode: "EDIT_NAVIGATION"
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
                },
                authCode: "EDIT_NAVIGATION"
            }
        ]

        if (!navJson?.length)
            navCard.unshift({
                actionLabel: "Clone",
                desc: "Save existing navigation to your site",
                action: () => {
                    saveNav(navigation)
                },
                authCode: "EDIT_NAVIGATION"
            })

        return navCard
    }, [navJson])

    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex pb-3">
                <AdminCard cardsRef={cardsRef ?? []} />
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
                        isOutermost={true}
                        isLast={idx === navigation?.length - 1}
                        updateNavParentLevel={updateNavParentLevel}
                    />
                ))}

                {isDraggable && (
                    <div
                        className="w-100 d-flex AdminNavItem align-items-center justify-content-center rounded-3"
                        style={{
                            height: 60,
                            background: isOuterMost
                                ? "var(--static-color-primary)"
                                : "transparent",
                            border: "3px dashed var(--static-color-primary)",
                            opacity: isOuterMost ? 0.3 : 1
                        }}>
                        <span
                            className="text-level-caption text-font-medium"
                            style={{
                                color: isOuterMost
                                    ? "var(--static-color-text-nu)"
                                    : ""
                            }}>
                            Drop here to move the item to outermost layer
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
