"use client"

import React, { useEffect, useRef, useMemo } from "react"
const { useDrop, useDragDropManager } = require("react-dnd")
import { v4 as uuid_v4 } from "uuid"
import _ from "lodash"
import { deepParseJson } from "deep-parse-json"
import { ParsePageContextProvider } from "./ParsePageContext"
import { ViewPageArea } from "./ViewPageArea"

type ViewPageContainerProps = {
    pageJson: string
}

export const ViewPageContainer: React.FC<ViewPageContainerProps> = ({
    pageJson
}) => {
    const isBannerPage = useMemo(() => {
        try {
            const pJson = JSON.parse(pageJson)
            return pJson?.[0]?.element === "banner"
        } catch (e) {
            return false
        }
    }, [pageJson])

    return (
        <ParsePageContextProvider pageJson={pageJson}>
            {!isBannerPage && (
                <div id="header-padding" style={{ height: 55 }} />
            )}
            {pageJson && <ViewPageArea pageJson={pageJson} />}
        </ParsePageContextProvider>
    )
}

ViewPageContainer.displayName = "ViewPageContainer"
