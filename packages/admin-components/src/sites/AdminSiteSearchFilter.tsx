import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { useRouter } from "next/navigation"
import { siteType } from "@nextjs-cms-library/db-services/index"
import moment from "moment"
import styles from "../AdminControl.module.scss"
import { AdminActionButton } from "../core/AdminActionButton"
import { AdminTextInput } from "../input/AdminTextInput"
import { useState } from "react"

interface AdminSiteCardInterface {
    searchSite: (name: string) => void
}

export const AdminSiteSearchFilter: React.FC<AdminSiteCardInterface> = ({
    searchSite
}) => {
    const [searchName, setSearchName] = useState<string>("")

    return (
        <div className="d-flex flex-row p-2 col-12 col-md-6 w-100 items-center">
            <div>Search: </div>

            <div className="px-2 w-100">
                <AdminTextInput
                    label=""
                    defaultValue={""}
                    onChange={(v) => setSearchName(v)}
                />
            </div>

            <AdminActionButton
                label="Search"
                onClick={() => {
                    searchSite(searchName)
                }}
            />
        </div>
    )
}
