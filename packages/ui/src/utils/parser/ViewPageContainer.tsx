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
    console.log("pageJson", pageJson)

    return (
        <ParsePageContextProvider pageJson={pageJson}>
            {pageJson && <ViewPageArea pageJson={pageJson} />}
        </ParsePageContextProvider>
    )
}

ViewPageContainer.displayName = "ViewPageContainer"
