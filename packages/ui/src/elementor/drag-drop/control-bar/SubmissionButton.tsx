import React from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import { AdminCard } from "@nextjs-cms-library/admin-components/index"
import useViewHook from "../hooks/useViewHook"

type SubmissionButtonProps = {}

export const SubmissionButton: React.FC<SubmissionButtonProps> = () => {
    const { submit, readOnly, propertiesEditList, isPreview } =
        useDisplayPanelContext()

    const handleSubmitPageData = async () => {
        if (!submit) return

        await submit(propertiesEditList)
    }

    return (
        <div
            className="shadow fixed s-section-primary rounded-2 p-3"
            style={{
                display: readOnly || isPreview ? "none" : "flex",
                width: 300,
                right: 20,
                zIndex: 10,
                marginTop: 20,
                marginBottom: 20
            }}>
            <div className="w-100">
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: "Update Page",
                            desc: "Update and save the edited page",
                            action: () => {
                                handleSubmitPageData()
                            },
                            isFull: true
                        }
                    ]}
                />
            </div>
        </div>
    )
}
