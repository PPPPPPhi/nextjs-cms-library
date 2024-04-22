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

interface AdminSiteBubbleInterface {
    sites: siteType[]
    isCollapsed: boolean
}

export const AdminSiteBubble: React.FC<AdminSiteBubbleInterface> = ({
    sites,
    isCollapsed
}) => {
    const [options, setOptions] = useState<{ label: string; value: string }[]>()
    const { roleFairList } = useAdminAuthorizationContext()

    const { site } = useParams()
    const router = useRouter()

    const siteValue = useMemo(() => {
        return sites.find((k) => k.slug === site) ? site : undefined
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

    return (
        <div className="d-flex w-100 p-3" style={{ height: 90 }}>
            <div
                className={`d-flex w-100 s-section-secondary rounded-5 align-items-center justify-content-center ${isCollapsed ? "" : "py-2 px-4"}`}>
                <HiGlobeAsiaAustralia className="s-text-color-nu" />
                {options && !isCollapsed && (
                    <Dropdown
                        options={options}
                        onChange={(v) => {
                            router.push(`/admin/${v.value}`)
                        }}
                        value={(siteValue as string) ?? null}
                        placeholder="Please Select"
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
