import React from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { PropertiesComponentProps } from "../../../utils/index"
// import {
//     AdminButton,
//     AdminCreateCard
// } from "@/client/components/admin-components"

type SubmissionButtonProps = {}

export const SubmissionButton: React.FC<SubmissionButtonProps> = () => {
    const { submit, propertiesHistoryList, currentHistoryIndex, readOnly } =
        useDisplayPanelContext()

    const handleSubmitPageData = async () => {
        console.log(`handleSubmitPageData submit`, submit)

        if (!submit) return

        const pageData = propertiesHistoryList[
            currentHistoryIndex
        ] as PropertiesComponentProps[]

        console.log(`handleSubmitPageData`, pageData)

        await submit(pageData)
    }

    return (
        <div
            className="fixed w-100 justify-content-end"
            style={{
                display: !readOnly ? "flex" : "none",
                flexDirection: "row",
                justifyContent: "center",
                bottom: 30,
                right: 60,
                zIndex: 100
            }}>
            {/* <AdminCreateCard
                desc="Save a new version of page"
                actionLabel="Update Page"
                action={() => {
                    handleSubmitPageData()
                }}
            /> */}

            <div
                style={{ width: 220, borderRadius: 25, height: 50 }}
                onClick={handleSubmitPageData}
                className={`flex justify-center cursor-pointer s-adminGradientBg shadow s-text-color-nu font-medium rounded-full text-lg p-2.5 text-center items-center me-2`}>
                <span>Update Page</span>
            </div>
        </div>
    )
}
