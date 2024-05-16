import React, { useState } from "react"

import _ from "lodash"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { AdminCircularButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponent } from "./PropertiesComponent"
import { HiViewBoards } from "react-icons/hi"
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs"

type PropertiesPanelAreaProps = {}

export const PropertiesPanelArea: React.FC<PropertiesPanelAreaProps> = (
    props: PropertiesPanelAreaProps
) => {
    const { isExpandView, focusEditId } = useDisplayPanelContext()

    const [isWideMode, setIsWideMode] = useState(false)

    return (
        <div
            id="page-edit-properties-area"
            className="p-2"
            style={{
                width: isWideMode ? 800 : 350,
                display: !isExpandView && focusEditId?.id ? "block" : "none"
            }}>
            <div
                className=" dark:text-white p-3 d-flex flex-column h-100"
                style={{
                    border: "2px solid var(--static-color-secondary)",
                    borderRadius: 12
                }}>
                <div className="h-100" style={{ flex: 1 }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text-font-bold text-level-body s-text-color-beta">
                            Edit Properties
                        </span>
                        <div onClick={() => setIsWideMode(!isWideMode)}>
                            {isWideMode ? (
                                <BsArrowsAngleContract
                                    style={{
                                        width: 24,
                                        height: 24,
                                        color: "var(--static-color-secondary)"
                                    }}
                                />
                            ) : (
                                <BsArrowsAngleExpand
                                    style={{
                                        width: 24,
                                        height: 24,
                                        color: "var(--static-color-secondary)"
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <PropertiesComponent
                        element={""}
                        type={""}
                        id={""}
                        index={0}
                        isWideMode={false}
                    />
                </div>
            </div>
        </div>
    )
}

PropertiesPanelArea.displayName = "PropertiesPanelArea"
