import { useMemo, useState, useCallback, useEffect } from "react"
import { useCollapse } from "react-collapsed"
import { HiChevronUp, HiChevronDown } from "react-icons/hi"
import {
    HiMiniBars4,
    HiArrowUpCircle,
    HiArrowDownCircle
} from "react-icons/hi2"
import { AdminNavButton } from "./AdminNavButton"
import { v4 as uuid_v4 } from "uuid"
const { useDrag } = require("react-dnd")
import { AdminIconButton } from "../core"
import {
    HiFolderAdd,
    HiPencil,
    HiDocumentRemove,
    HiFolderRemove
} from "react-icons/hi"
import { useAdminNavigationContext } from "./context/AdminNavigationContext"

interface BadgeInterface {
    label: "_blank" | "_self"
}

const NAV_TARGET_BADGE_COLOR = {
    _blank: "red",
    _self: "yellow"
}

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

interface AdminNavigationItemInterface {
    id: string
    navItem: naviagtionType
    idx: number
    refIdx: number[]
    onAddNavItem: (refIdx: number[]) => void
    onEditNavItem: (refIdx: number[]) => void
    onRemoveNavItem: (refIdx: number[]) => void
    isOutermost?: boolean
    isLast?: boolean
    updateNavParentLevel?: (position: number, action: "u" | "d") => void
}

export type naviagtionType = {
    name: string
    url: string
    target: "_blank" | "_self"
    children?: naviagtionType[]
    level?: number
}

const MAX_LEVEL = 3

export const AdminNavigationItem: React.FC<AdminNavigationItemInterface> = ({
    id,
    navItem,
    idx,
    refIdx,
    onAddNavItem,
    onEditNavItem,
    onRemoveNavItem,
    isOutermost,
    isLast,
    updateNavParentLevel
}) => {
    const [isExpanded, setExpanded] = useState(false)
    const {
        setIsCollapsing,
        isDraggable,
        isShowSetting,
        osPosition,
        osIdRefList
    } = useAdminNavigationContext()

    const { getCollapseProps, getToggleProps } = useCollapse({
        isExpanded,
        onTransitionStateChange: (state) => {
            if (!isDraggable) {
                if (state === "expandStart") setIsCollapsing(true)
                else if (state === "expandEnd") setIsCollapsing(false)
            }
        }
    })

    useEffect(() => {
        if (isDraggable) {
            setExpanded(true)
            setIsCollapsing(false)
        }
    }, [isDraggable])

    const excludeSetting = isDraggable
    const { name, url, target, children, level = 1 } = navItem

    const isMaxLevel = level === MAX_LEVEL

    const ddKey = useMemo(() => {
        return uuid_v4()
    }, [])

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: isDraggable ? "collapsible_menu" : "Not-draggable",
            collect: (monitor: any) => ({
                isDragging: !!monitor.isDragging()
            }),
            item: { id: ddKey }
        }),
        [isDraggable, ddKey]
    )

    const isFitOffset = useMemo(() => {
        if (osPosition !== -99 && osIdRefList.length > 0) {
            if (osIdRefList[osPosition] === ddKey) return true
            else return false
        }
        return false
    }, [ddKey, osIdRefList, osPosition])

    return (
        <div className="d-flex w-100 flex-column px-3 py-2">
            <div
                className="d-flex w-100 s-section-primary p-2 align-items-center flex-wrap shadow rounded-2"
                style={{ cursor: !isMaxLevel ? "pointer" : "default" }}>
                <div
                    ddKey={ddKey}
                    className="d-flex w-100 align-items-center AdminNavItem"
                    {...getToggleProps({
                        onClick: () => {
                            if (!isMaxLevel && !isDraggable)
                                setExpanded((prevExpanded) => !prevExpanded)
                        }
                    })}
                    style={{ flex: 1 }}>
                    <div className="d-flex w-100 align-items-center" ref={drag}>
                        <HiMiniBars4 style={{ margin: "0 10px 0 0" }} />
                        <span>{name}</span>
                        <Badge label={target} />
                        <span className="text-level-remark">{url}</span>
                    </div>
                </div>

                {!excludeSetting && (
                    <AdminIconButton
                        icon={<HiPencil />}
                        authCode="EDIT_NAVIGATION"
                        onActionClick={() => {
                            onEditNavItem(refIdx)
                        }}
                    />
                )}
                {isDraggable && isOutermost && idx !== 0 && (
                    <HiArrowUpCircle
                        style={{ width: 24, height: 24 }}
                        onClick={() => {
                            updateNavParentLevel &&
                                updateNavParentLevel(idx, "u")
                        }}
                    />
                )}
                {isDraggable && isOutermost && !isLast && (
                    <HiArrowDownCircle
                        style={{ width: 24, height: 24 }}
                        onClick={() => {
                            updateNavParentLevel &&
                                updateNavParentLevel(idx, "d")
                        }}
                    />
                )}
                {!excludeSetting && (
                    <NavActionButton
                        icon={
                            !isMaxLevel ? (
                                <HiFolderRemove />
                            ) : (
                                <HiDocumentRemove />
                            )
                        }
                        onActionClick={() => {
                            onRemoveNavItem(refIdx)
                        }}
                    />
                )}
                {!isMaxLevel && (
                    <div className="d-flex px-2">
                        {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
                    </div>
                )}
            </div>
            {isFitOffset && (
                <div
                    className="d-flex w-100"
                    style={{ height: 1, background: "blue" }}
                />
            )}
            <section {...getCollapseProps()} className="">
                {children?.map((l, subIdx) => {
                    const newRefIdx = [...refIdx, subIdx]

                    return (
                        <AdminNavigationItem
                            key={`nav_collapsed_${subIdx}`}
                            id={`nav_collapsed_${subIdx}`}
                            navItem={{
                                ...l,
                                level: level + 1
                            }}
                            idx={subIdx}
                            refIdx={newRefIdx}
                            onAddNavItem={onAddNavItem}
                            onEditNavItem={onEditNavItem}
                            onRemoveNavItem={onRemoveNavItem}
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
                    disabled={!isShowSetting || isDraggable}
                />
            )}
        </div>
    )
}
