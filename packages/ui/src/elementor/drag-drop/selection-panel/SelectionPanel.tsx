import React from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { SelectComponent } from "./SelectComponent"
import { AdminTabMenu } from "@nextjs-cms-library/admin-components/index"
import { SelectionJson } from "@nextjs-cms-library/ui/index"

const SECTION_PANEL_LIST = ["Layouts", "Elements"]

interface SelectionPanelInterface {}
interface PanelChildInterface {
    isActive: boolean
    childrens: Map<string, SelectionJson>
}

const PanelChild: React.FC<PanelChildInterface> = ({ isActive, childrens }) => {
    return (
        <div
            className={"flex-wrap overflow-y-auto"}
            style={{ display: isActive ? "flex" : "none", height: "auto" }}>
            {childrens &&
                Array.from(childrens.entries()).map((e: any, key: any) => {
                    const value = e[1]
                    const { element, icon, title } = value ?? {}
                    return (
                        <div
                            key={key}
                            className="col-6 d-flex justify-content-center">
                            <SelectComponent
                                element={element}
                                icon={icon}
                                title={title}
                            />
                        </div>
                    )
                })}
        </div>
    )
}

export const SelectionPanel: React.FC<SelectionPanelInterface> = ({}) => {
    const { elementsList, layoutList, isExpandView } = useDisplayPanelContext()

    const [panelTab, setPanelTab] = React.useState<string>("Layouts")

    const isLayoutPage = panelTab === "Layouts"
    const isElementPage = panelTab === "Elements"

    return (
        <div
            id="page-selection-area"
            className="p-3 rounded-3"
            aria-label="Sidebar"
            style={{
                width: 300,
                display: !isExpandView ? "block" : "none"
            }}>
            <div className="h-100 d-flex flex-column">
                <div className="d-flex align-items-centrer px-2 w-100 py-3">
                    <AdminTabMenu
                        tabList={SECTION_PANEL_LIST}
                        callback={(tab) => {
                            setPanelTab(SECTION_PANEL_LIST[tab] as string)
                        }}
                    />
                </div>
                <PanelChild
                    isActive={isLayoutPage}
                    childrens={layoutList as Map<string, SelectionJson>}
                />
                <PanelChild
                    isActive={isElementPage}
                    childrens={elementsList as Map<string, SelectionJson>}
                />
            </div>
        </div>
    )
}
