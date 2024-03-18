import React from "react"
import { useParams, useRouter } from "next/navigation"

import { useDisplayPanelContext } from "../DisplayPanelContext"
import { PropertiesComponentProps } from "../../../utils/index"
import {
    AdminButton,
    AdminCard
} from "@nextjs-cms-library/admin-components/index"
// import { AdminButton } from "@/"

type SubmissionButtonProps = {}

export const SubmissionButton: React.FC<SubmissionButtonProps> = () => {
    const { submit, propertiesHistoryList, currentHistoryIndex, readOnly } =
        useDisplayPanelContext()
    const router = useRouter()
    const { site, pageId } = useParams()

    const handleSubmitPageData = async () => {
        console.log(`handleSubmitPageData submit`, submit)

        if (!submit) return

        const pageData = propertiesHistoryList[
            currentHistoryIndex
        ] as PropertiesComponentProps[]

        console.log(`handleSubmitPageData`, pageData)

        await submit(pageData)
        router.push(`/admin/${site}/pages`)
    }

    const cardRef = {
        desc: "Save a new version of page",
        actionLabel: "Update Page",
        action: () => {
            handleSubmitPageData()
        }
    }

    return (
        <div
            className="shadow fixed s-section-primary rounded-2 p-3"
            style={{
                display: !readOnly ? "flex" : "none",
                width: 300,
                right: 20,
                zIndex: 10,
                marginTop: 20,
                marginBottom: 20
            }}>
            <AdminButton
                label="Update Page"
                style={{ width: "100%" }}
                onClick={handleSubmitPageData}
            />
            {/* <AdminCard cardsRef={[cardRef]} /> */}

            {/* <div
                style={{ width: 220, borderRadius: 25, height: 50 }}
                onClick={handleSubmitPageData}
                className={`flex justify-center cursor-pointer s-adminGradientBg shadow s-text-color-nu font-medium rounded-full text-lg p-2.5 text-center items-center me-2`}>
                <span>Update Page</span>
            </div> */}
        </div>
    )
}
