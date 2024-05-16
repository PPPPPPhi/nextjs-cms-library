import { useState, useEffect } from "react"
import { AdminButton } from "../core"
import styles from "../AdminControl.module.scss"

interface AdminTabMenuInterface {
    tabList: string[]
    callback?: (idx: number) => void
    defaultTab?: number
}

interface SectionHeaderInterface {
    label: string
    selectedTab: number | undefined
    tabIndex: number
    setSelectedTab: () => void
}

const SectionHeader: React.FC<SectionHeaderInterface> = ({
    label,
    tabIndex,
    setSelectedTab,
    selectedTab
}) => {
    const isSelected = selectedTab === tabIndex

    return (
        <div
            className={`d-flex flex-column justify-content-center align-items-center px-2 cursor-pointer 
            ${isSelected ? "s-section-secondary" : "s-section-quaternary"}`}
            onClick={() => {
                setSelectedTab()
            }}
            style={{
                height: 27,
                minWidth: 50,
                borderRadius: 15,
                color: isSelected
                    ? "var(--static-bg-quaternary)"
                    : "var(--static-bg-secondary)",
                border: isSelected
                    ? "none"
                    : "1px solid var(--static-bg-secondary)"
            }}>
            <span className="text-level-content text-font-medium px-2">
                {label}
            </span>
        </div>
    )
}

export const AdminTabMenu: React.FC<AdminTabMenuInterface> = ({
    tabList,
    callback = (idx: number) => {},
    defaultTab
}) => {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0)
    const [tabs, setTabs] = useState<string[]>(tabList)

    useEffect(() => {
        if (defaultTab) {
            setSelectedTab(defaultTab)
        }
    }, [])
    useEffect(() => {
        if (tabList.length) setTabs(tabList)
    }, [tabList])

    return (
        <div className="d-flex w-100 space-x-3" id="lang_selector_container">
            {tabs?.map((l, idx) => (
                <SectionHeader
                    key={`admin_tab_menu_${idx}`}
                    selectedTab={selectedTab}
                    tabIndex={idx}
                    setSelectedTab={() => {
                        setSelectedTab(idx)

                        if (callback) callback(idx ?? 1)
                    }}
                    label={l}
                />
            ))}
        </div>
    )
}
