import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { useRouter } from "next/navigation"
import { siteType } from "@nextjs-cms-library/db-services/index"
import moment from "moment"
import styles from "../AdminControl.module.scss"

interface AdminSiteCardInterface {
    sites: siteType
}

export const AdminSiteCard: React.FC<AdminSiteCardInterface> = ({ sites }) => {
    const { name, description, slug, image, createdBy, createdAt } = sites
    const router = useRouter()

    return (
        <div className="p-2 col-12 col-md-6">
            <div
                className={`d-flex rounded-3 cursor-pointer mt-2 ${styles.adminSiteCard}`}
                onClick={() => router.push(`./admin/${slug}`)}>
                <div
                    className="d-flex flex w-100 h-100 rounded-2 p-4 flex-wrap align-items-center justify-content-center"
                    style={{ background: "white" }}>
                    <div
                        className={`d-lg-block col-12 col-md-3 position-relative ${styles.adminSiteCardIcon}`}>
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
                        style={{ flex: 1 }}>
                        <span className="text-level-headline text-font-bold s-text-color-beta py-3">
                            {name}
                        </span>
                        <div style={{ flex: 1 }} />
                        <span className="text-level-caption text-font-normal s-text-color-alpha">
                            {/* {description} */}
                            Lastest update:
                        </span>
                        <span className="text-level-content text-font-medium s-text-color-alpha">
                            {moment(String(createdAt)).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
