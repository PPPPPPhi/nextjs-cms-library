"use client"

import React from "react"
import _ from "lodash"
import { useParsePageContext } from "./ParsePageContext"
import { useParsePageJson } from "./useParsePageJson"
import { ViewPageElement } from "./ViewPageElement"

interface ViewPageAreaProps {
    pageJson: string
}

export const ViewPageArea: React.FC<ViewPageAreaProps> = ({ pageJson }) => {
    const { pageElementList } = useParsePageContext()

    useParsePageJson(pageJson)

    console.log("pppv 0", pageElementList)
    return (
        <div
            id="display-panel-drag-drop-area"
            style={{
                height: "100%"
            }}>
            {pageElementList &&
                pageElementList.map((props) => {
                    const {
                        element,
                        type,
                        id,
                        index,
                        component,
                        elements,
                        properties
                    } = props
                    console.log("pppv 1.5", props)

                    const isCointainer = element !== "banner"

                    return (
                        <div
                            key={id}
                            className={`${isCointainer && "componentContainer"}`}>
                            <ViewPageElement
                                element={element}
                                type={type}
                                id={id}
                                index={index}
                                Component={component}
                                elements={elements}
                                properties={properties}
                            />
                        </div>
                    )
                })}
        </div>
    )
}

ViewPageArea.displayName = "ViewPageArea"
