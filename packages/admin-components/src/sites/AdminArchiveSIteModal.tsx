import { NextImageApdator } from "@nextjs-cms-library/ui/index"
import { useRouter } from "next/navigation"
import { siteType } from "@nextjs-cms-library/db-services/index"
import moment from "moment"
import styles from "../AdminControl.module.scss"
import { AdminActionButton } from "../core/AdminActionButton"
import { AdminTextInput } from "../input/AdminTextInput"
import { AdminUploadFile } from "../input/AdminUploadFile"
import { useState, useEffect } from "react"

interface AdminArchiveSiteModalInterface {
    name: string
}

export const AdminArchiveSiteModal: React.FC<
    AdminArchiveSiteModalInterface
> = ({ name }) => {
    return (
        <div className={`d-flex flex-row justify-center text-align`}>
            <div className={`d-flex flex-row items-center`}>
                <div>Are you sure want to archive the site</div>
                <div className="text-font-bold px-1">{name}</div>
                <div>?</div>
            </div>
        </div>
    )
}
