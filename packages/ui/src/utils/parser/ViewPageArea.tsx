"use client"

import React from "react"
import _ from "lodash"
import { useParsePageContext } from "./ParsePageContext"
import { useParsePageJson } from "./useParsePageJson"
import { ViewPageElement } from "./ViewPageElement"
import { isLayoutComponent } from "../../elementor/maps/LayoutsComponentMap"

interface ViewPageAreaProps {
    pageJson: string
}

export const ViewPageArea: React.FC<ViewPageAreaProps> = ({ pageJson }) => {
    const { pageElementList } = useParsePageContext()

    useParsePageJson(pageJson)

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

                    const isCointainer = element !== "banner"
                    const isLayout = isLayoutComponent(element)

                    return (
                        <div
                            key={id}
                            className={`${isCointainer && !isLayout ? "componentContainer" : ""}`}>
                            <ViewPageElement
                                element={element}
                                type={type}
                                id={id}
                                index={index}
                                //@ts-ignore
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
