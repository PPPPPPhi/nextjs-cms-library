import React from "react"
import { useDisplayPanelContext } from "../DisplayPanelContext"
import {
    AdminCard,
    useAdminContext
} from "@nextjs-cms-library/admin-components/index"
import useViewHook from "../hooks/useViewHook"
import { useRouter, useParams } from "next/navigation"

interface PreviewButtonInterface {}

export const PreviewButton: React.FC<PreviewButtonInterface> = () => {
    const { readOnly, isPreview } = useDisplayPanelContext()
    const { pageInfo } = useAdminContext()
    const { site, pageId } = useParams()

    const { language } = pageInfo ?? {}

    return (
        <div
            className="shadow fixed s-section-primary rounded-2 p-3"
            style={{
                display: readOnly || isPreview ? "none" : "flex",
                width: 300,
                left: 20,
                zIndex: 10,
                marginTop: 20,
                marginBottom: 20
            }}>
            <div className="w-100">
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: "Preview Page",
                            desc: "Preview page in a new tab",
                            action: () => {
                                window.open(
                                    `${process.env.NEXT_DNS_PATH}/preview/${site}/${language}/${pageId}`,
                                    "_blank"
                                )
                            },
                            isFull: true
                        }
                    ]}
                />
            </div>
        </div>
    )
}
