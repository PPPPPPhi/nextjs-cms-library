import { AdminCard } from "@nextjs-cms-library/admin-components/index"
import { useAdminContext } from "@nextjs-cms-library/admin-components/index"
import { useParams } from "next/navigation"
import { useDisplayPanelContext } from "./DisplayPanelContext"
import { SelectionPanel } from "./selection-panel/SelectionPanel"
import { DragDropArea } from "./drag-drop-panel/DragDropArea"
import { PropertiesPanelArea } from "./property-panel/PropertiesPanelArea"

interface DisplayContainerWrapperInterface {
    pageJson: any
}

export const DisplayContainerWrapper: React.FC<
    DisplayContainerWrapperInterface
> = ({ pageJson }) => {
    const { pageInfo } = useAdminContext()
    const { submit, readOnly, propertiesEditList } = useDisplayPanelContext()

    const { site, pageId } = useParams()
    const { language } = pageInfo ?? {}

    const handleSubmitPageData = async () => {
        if (!submit) return

        await submit(propertiesEditList)
    }

    return (
        <div className="d-flex flex-column w-100 h-100">
            <div className="d-flex" style={{ height: 54 }}>
                <AdminCard
                    cardsRef={[
                        {
                            actionLabel: "Edit Page Info",
                            desc: "Preview page in a new tab",
                            action: () => {
                                window.open(
                                    `${process.env.NEXT_DNS_PATH}/preview/${site}/${language}/${pageId}`,
                                    "_blank"
                                )
                            },
                            isFull: true
                        },
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
                        },
                        {
                            actionLabel: "Save Changes",
                            desc: "Update and save the edited page",
                            action: () => {
                                handleSubmitPageData()
                            },
                            isFull: true
                        }
                    ]}
                />
            </div>
            <div
                className="d-flex w-100 justify-content-center overflow-hidden"
                style={{
                    borderTop: "1px solid var(--static-bg-boundary)",
                    flex: 1
                }}>
                <div
                    className="d-flex w-100 h-100"
                    style={{ maxHeight: "100%" }}>
                    {!readOnly && <SelectionPanel />}
                    <div className="overflow-scroll" style={{ flex: 1 }}>
                        {pageJson && <DragDropArea pageJson={pageJson ?? {}} />}
                    </div>
                    {!readOnly && <PropertiesPanelArea />}
                </div>
            </div>
        </div>
    )
}
