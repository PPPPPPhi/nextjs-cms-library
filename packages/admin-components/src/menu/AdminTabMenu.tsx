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
    return (
        <div
            className={`d-flex flex-column shadow justify-content-center align-items-center px-2 cursor-pointer ${styles.adminButton}`}
            onClick={() => {
                setSelectedTab()
            }}>
            {selectedTab === tabIndex && (
                <div
                    className="w-100"
                    style={{ background: "white", height: 2 }}
                />
            )}
            <span className="text-level-remark s-text-color-nu">{label}</span>
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
