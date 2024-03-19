import React, { useEffect, useState } from "react"
import {
    DisplayPanelContextProvider,
    useDisplayPanelContext
} from "../DisplayPanelContext"
import { SelectComponent } from "./SelectComponent"
import { Tabs } from "flowbite-react"
import { SubmissionButton } from "../control-bar/SubmissionButton"
// import { AdminTabMenu } from "@/client/components/admin-components/AdminTabMenu"

type SelectionPanelProps = {}

export const SelectionPanel: React.FC<SelectionPanelProps> = ({}) => {
    const { elementsList, layoutList, isExpandView } = useDisplayPanelContext()

    const selectionPanel = ["Layout", "Elements"]
    const [isLayoutTab, setLayoutTab] = React.useState<boolean>(true)

    return (
        <div
            id="page-selection-area"
            className="shadow fixed z-40 w-64 s-section-primary p-3 rounded-3"
            aria-label="Sidebar"
            style={{
                width: 300,
                minWidth: 0,
                left: 20,
                display: !isExpandView ? "block" : "none",
                top: 100,
                height: "80%",
                zIndex: 1
            }}>
            <div className="overflow-y-auto h-100">
                <div className="s-select-tab mb-3 flex flex-row justify-center">
                    <div
                        style={{ width: 120, height: 30, borderRadius: 25 }}
                        onClick={() => setLayoutTab(true)}
                        className={`flex justify-center cursor-pointer s-adminGradientBg shadow s-text-color-nu rounded-full text-sm p-2.5 text-center items-center me-2 ${isLayoutTab ? "font-bold underline" : ""}`}>
                        <span>Layout</span>
                    </div>

                    <div
                        style={{ width: 120, height: 30, borderRadius: 25 }}
                        onClick={() => setLayoutTab(false)}
                        className={`flex justify-center cursor-pointer s-adminGradientBg shadow s-text-color-nu rounded-full text-sm p-2.5 text-center items-center me-2 ${!isLayoutTab ? "font-bold underline" : ""}`}>
                        <span>Elements</span>
                    </div>
                </div>

                <div
                    className={`s-select-area flex-wrap`}
                    style={{ display: isLayoutTab ? "flex" : "none" }}>
                    {layoutList &&
                        Array.from(layoutList.entries()).map(
                            (element: any, key: any) => {
                                const value = element[1]

                                return (
                                    <div
                                        key={key}
                                        className="col-6 d-flex justify-content-center mt-2">
                                        <SelectComponent
                                            element={value?.element}
                                            icon={value?.icon}
                                            title={value?.title}
                                        />
                                    </div>
                                )
                            }
                        )}
                </div>

                <div
                    className={`s-select-area flex-wrap space-y-2`}
                    style={{ display: !isLayoutTab ? "flex" : "none" }}>
                    {elementsList &&
                        Array.from(elementsList.entries()).map(
                            (element: any, key: any) => {
                                const value = element[1]

                                return (
                                    <div
                                        key={key}
                                        className="col-6 d-flex justify-content-center mt-2">
                                        <SelectComponent
                                            element={value?.element}
                                            icon={value?.icon}
                                            title={value?.title}
                                        />
                                    </div>
                                )
                            }
                        )}
                </div>
            </div>
        </div>
    )
}
