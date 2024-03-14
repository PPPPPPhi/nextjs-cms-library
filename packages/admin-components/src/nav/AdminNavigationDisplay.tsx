import { useRef, useState, useCallback, useEffect } from "react"
import { useCollapse } from "react-collapsed"
import { HiChevronUp, HiChevronDown } from "react-icons/hi"
import { AdminNavButton } from "./AdminNavButton"
import {
    HiFolderAdd,
    HiPencil,
    HiDocumentRemove,
    HiFolderRemove
} from "react-icons/hi"
import { AdminCreateNavItemForm } from "../form"
import * as _ from "lodash"
import { AdminCard } from "../core"

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

interface CollapsedInterface {
    navItem: naviagtionType
    idx: number
    refIdx: number[]
    onAddNavItem: (refIdx: number[]) => void
    onEditNavItem: (refIdx: number[]) => void
    onRemoveNavItem: (refIdx: number[]) => void
    disableSetting: boolean
}

interface BadgeInterface {
    label: "_blank" | "_self"
}

const NAV_TARGET_BADGE_COLOR = {
    _blank: "red",
    _self: "yellow"
}
const MAX_LEVEL = 3

const Badge: React.FC<BadgeInterface> = ({ label }) => {
    return (
        <div
            className="d-flex align-items-center rounded-5 mx-2 px-2 shadow"
            style={{ background: "black" }}>
            <span
                className="text-level-remark"
                style={{
                    color: NAV_TARGET_BADGE_COLOR[label]
                }}>
                {label}
            </span>
        </div>
    )
}

interface AdminNavNavigationButton {
    icon: React.ReactNode
    onActionClick: () => void
}
const NavActionButton: React.FC<AdminNavNavigationButton> = ({
    icon,
    onActionClick
}) => {
    const Icon = useCallback(() => {
        if (icon) return icon
        else return <></>
    }, [icon])

    return (
        <div
            className="cursor-pointer text-level-subtitle s-text-color-alpha"
            onClick={(e) => {
                e.preventDefault()
                onActionClick()
            }}>
            <Icon />
        </div>
    )
}

const Collapsed: React.FC<CollapsedInterface> = ({
    navItem,
    idx,
    refIdx,
    onAddNavItem,
    onEditNavItem,
    onRemoveNavItem,
    disableSetting
}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    const { name, url, target, children, level = 1 } = navItem

    const isMaxLevel = level === MAX_LEVEL

    return (
        <div className="d-flex w-100 flex-column px-3">
            <div
                className="d-flex w-100 s-section-primary p-2 align-items-center flex-wrap shadow rounded-2"
                style={{ cursor: !isMaxLevel ? "pointer" : "default" }}>
                <div
                    className="d-flex w-100"
                    {...getToggleProps({
                        onClick: () => {
                            if (!isMaxLevel)
                                setExpanded((prevExpanded) => !prevExpanded)
                        }
                    })}
                    style={{ flex: 1 }}>
                    <span>{name}</span>
                    <Badge label={target} />
                    <span className="text-level-remark">{url}</span>
                </div>
                <NavActionButton
                    icon={<HiPencil />}
                    onActionClick={() => {
                        onEditNavItem(refIdx)
                    }}
                />
                <NavActionButton
                    icon={
                        !isMaxLevel ? <HiFolderRemove /> : <HiDocumentRemove />
                    }
                    onActionClick={() => {
                        onRemoveNavItem(refIdx)
                    }}
                />
                {!isMaxLevel && (
                    <div className="d-flex px-2">
                        {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
                    </div>
                )}
            </div>
            <section {...getCollapseProps()} className="p-2">
                {children?.map((l, subIdx) => {
                    const newRefIdx = [...refIdx, subIdx]

                    return (
                        <Collapsed
                            key={`nav_collapsed_${subIdx}`}
                            navItem={{
                                ...l,
                                level: level + 1
                            }}
                            idx={subIdx}
                            refIdx={newRefIdx}
                            onAddNavItem={onAddNavItem}
                            onEditNavItem={onEditNavItem}
                            onRemoveNavItem={onRemoveNavItem}
                            disableSetting={disableSetting}
                        />
                    )
                })}
            </section>
            {!isMaxLevel && (
                <AdminNavButton
                    icon={<HiFolderAdd />}
                    label={name}
                    onNavClick={() => {
                        onAddNavItem(refIdx)
                    }}
                    disabled={disableSetting}
                />
            )}
        </div>
    )
}

// const CollapseNavEditor = withNavEditor(Collapsed)

export const AdminNavigationDisplay: React.FC<
    AdminNavigationDisplayInterface
> = ({ navJson, saveNav, setModal }) => {
    const formRef = useRef<any>()

    const [navigation, setNavigation] = useState<naviagtionType[]>(navJson)
    const [isShowSetting, setIsShowSetting] = useState(true)

    useEffect(() => {
        setNavigation(navJson)
    }, [navJson])

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
        <div className="d-flex flex-column w-100 space-y-3">
            <div className="d-flex pb-3">
                <AdminCard
                    cardsRef={[
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
            {navigation.map((k, idx) => (
                <Collapsed
                    key={`collapsed_${idx}`}
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
                    disableSetting={!isShowSetting}
                />
            ))}
        </div>
    )
}
