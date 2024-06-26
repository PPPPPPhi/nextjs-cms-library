import Dropdown from "react-dropdown"
import { useState, useEffect, useMemo } from "react"
import "./AdminSiteBubble.css"
import {
    HiChevronDown,
    HiChevronUp,
    HiGlobeAsiaAustralia
} from "react-icons/hi2"

import { siteType } from "@nextjs-cms-library/db-services/index"
import { useParams, useRouter } from "next/navigation"
import { useAdminAuthorizationContext } from "../../../role-management/src/contexts"
import { useActionAuthorizationHook } from "@nextjs-cms-library/role-management/index"

interface AdminSiteBubbleInterface {
    sites: siteType[]
    isCollapsed: boolean
}

export const AdminSiteBubble: React.FC<AdminSiteBubbleInterface> = ({
    sites,
    isCollapsed
}) => {
    const { isAuthorized } = useActionAuthorizationHook("MANAGE_SITE_BUBBLE")

    const [options, setOptions] = useState<{ label: string; value: string }[]>()
    const { roleFairList } = useAdminAuthorizationContext()

    const { site } = useParams()
    const router = useRouter()

    const siteValue = useMemo(() => {
        return sites?.find((k) => k.slug === site) ? site : undefined
    }, [site])

    useEffect(() => {
        if (sites?.length) {
            let roleSiteList = []

            if (roleFairList.includes("*")) roleSiteList = sites
            else {
                roleSiteList =
                    sites
                        .map((l) => {
                            if (roleFairList.includes(l.slug)) return l
                            else return undefined
                        })
                        .filter((l) => l) ?? []
            }

            setOptions(
                (roleSiteList as siteType[]).map((l) => {
                    return { label: l.name, value: l.slug }
                })
            )
        }
    }, [sites, roleFairList])

    if (!isAuthorized) return <></>
    return (
        <div
            className="d-flex w-100 px-3 align-items-center justify-content-center"
            style={{ minHeight: 60 }}>
            <div
                className={`d-flex w-100 s-section-secondary align-items-center justify-content-center`}
                style={{ height: 46, borderRadius: 12, padding: "7px 15px" }}>
                {options && (
                    <Dropdown
                        options={options}
                        onChange={(v) => {
                            router.push(`/admin/${v.value}`)
                        }}
                        value={isCollapsed ? "" : (siteValue as string) ?? null}
                        placeholder={isCollapsed ? "" : "Please Select"}
                        arrowClosed={
                            <HiChevronDown className="Dropdown-arrow" />
                        }
                        arrowOpen={<HiChevronUp className="Dropdown-arrow" />}
                    />
                )}
            </div>
        </div>
    )
}
