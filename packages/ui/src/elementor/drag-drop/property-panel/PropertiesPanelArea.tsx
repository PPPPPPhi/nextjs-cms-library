import React, { useState } from "react"

import _ from "lodash"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { AdminCircularButton } from "@nextjs-cms-library/admin-components/index"
import { PropertiesComponent } from "./PropertiesComponent"
import { HiViewBoards } from "react-icons/hi"

type PropertiesPanelAreaProps = {}

export const PropertiesPanelArea: React.FC<PropertiesPanelAreaProps> = (
    props: PropertiesPanelAreaProps
) => {
    const { isExpandView, focusEditId } = useDisplayPanelContext()

    const [isWideMode, setIsWideMode] = useState(false)

    return (
        <div
            id="page-edit-properties-area"
            className="shadow fixed s-section-primary rounded-2 p-3"
            style={{
                width: isWideMode ? 800 : 300,
                minWidth: 0,
                right: 20,
                display: !isExpandView && focusEditId?.id ? "block" : "none",
                top: 180,
                height: "70%",
                marginTop: 80,
                zIndex: 1
            }}>
            <div className=" dark:text-white p-2 d-flex flex-column h-100">
                <div className="h-100" style={{ flex: 1 }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="pb-2 text-font-bold text-level-subtitle s-text-color-alpha">
                            Edit Properties
                        </span>
                        <AdminCircularButton
                            icon={<HiViewBoards />}
                            onToggle={() => {
                                setIsWideMode(!isWideMode)
                            }}
                        />
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
