import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { useRouter } from "next/navigation"
import { siteType } from "@nextjs-cms-library/db-services/index"
import moment from "moment"
import { useState, useRef } from "react"
import styles from "../AdminControl.module.scss"
import { AdminActionButton } from "../core/AdminActionButton"
import { AdminEditSiteModal, EditSiteFormRef } from "./AdminEditSiteModal"
import { AdminArchiveSiteModal } from "./AdminArchiveSiteModal"

interface AdminSiteCardInterface {
    sites: siteType
    setModal: (v: any) => void
    updateSiteInfo: (site: string, data: EditSiteFormRef) => void
    archiveSite: (site: string) => void
}

export const AdminSiteCard: React.FC<AdminSiteCardInterface> = ({
    sites,
    setModal,
    updateSiteInfo,
    archiveSite
}) => {
    const { name, description, slug, image, createdBy, createdAt, updatedAt } =
        sites
    const router = useRouter()
    const editModalRef = useRef<any>()

    const useEditSiteName = () => {
        setModal({
            title: "Edit Site Name",
            content: (
                <AdminEditSiteModal
                    name={name}
                    description={description}
                    image={image}
                    onChangeModalValue={(modal: any) => {
                        editModalRef.current = modal
                    }}
                />
            ),
            confirmCTAText: "OK",
            confirmHandler: async () => {
                console.log(`current`, editModalRef.current)

                await updateSiteInfo(slug, editModalRef.current)
            }
        })
    }

    const useArchiveSite = () => {
        setModal({
            title: "Archive Site",
            content: <AdminArchiveSiteModal name={name} />,
            confirmCTAText: "OK",
            confirmHandler: () => {
                archiveSite(slug)
            }
        })
    }

    return (
        <div className="p-2 col-12 col-md-6">
            <div
                className={`h-100 d-flex rounded-3 cursor-pointer mt-2 ${styles.adminSiteCard}`}>
                <div
                    className="d-flex flex w-100 h-100 rounded-2 p-4 flex-wrap align-items-center justify-content-center"
                    style={{ background: "white" }}>
                    <div
                        className={`d-lg-block col-12 col-md-3 position-relative ${styles.adminSiteCardIcon}`}
                        onClick={() => router.push(`./admin/${slug}`)}>
                        <NextImageApdator
                            src={`${process.env.NEXT_IMAGE_UPLOAD_PATH}/${slug}${image}`}
                            alt="profile"
                            isStatic
                            fill
                            style={{
                                objectFit: "contain",
                                objectPosition: "center"
                            }}
                        />
                    </div>
                    <div
                        className="px-3 d-flex flex-column col-12 col-md-9 h-100 py-2"
                        style={{ flex: 1 }}
                        onClick={() => router.push(`./admin/${slug}`)}>
                        <div className="d-flex flex-row justify-between flex-wrap py-3">
                            <span className="text-level-headline text-font-bold s-text-color-beta">
                                {name}
                            </span>

                            <div className="d-flex flex-row">
                                <div className={`px-1`}>
                                    <AdminActionButton
                                        label="Edit"
                                        onClick={() => useEditSiteName()}
                                        style={{ minWidth: 50 }}
                                    />
                                </div>

                                <div>
                                    <AdminActionButton
                                        label="Archive"
                                        onClick={() => useArchiveSite()}
                                        style={{ minWidth: 60 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="text-level-caption text-font-normal s-text-color-alpha">
                            {/* {description} */}
                            Lastest update:
                        </span>
                        <span className="text-level-content text-font-medium s-text-color-alpha">
                            {moment(String(updatedAt)).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
