import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { useRouter } from "next/navigation"
import { siteType } from "@nextjs-cms-library/db-services/index"
import moment from "moment"

interface AdminSiteCardInterface {
    sites: siteType
}

export const AdminSiteCard: React.FC<AdminSiteCardInterface> = ({ sites }) => {
    const { name, description, slug, image, createdBy, createdAt } = sites
    const router = useRouter()

    return (
        <div className="p-2 col-12 col-md-6">
            <div
                className="d-flex rounded-3 cursor-pointer shadow mt-2"
                onClick={() => router.push(`./admin/${slug}`)}>
                <div className="d-flex flex w-100 h-100 rounded-2 p-2 s-section-primary flex-wrap">
                    <div
                        className="d-lg-block col-12 col-md-3 position-relative"
                        style={{ height: 80 }}>
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
                        className="px-2 d-flex flex-column col-12 col-md-9"
                        style={{ flex: 1 }}>
                        <span className="text-level-headline text-font-bold">
                            {name}
                        </span>
                        <span className="text-level-remark text-font-regular">
                            {description}
                        </span>
                        <span className="text-level-remark text-font-regular">
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
