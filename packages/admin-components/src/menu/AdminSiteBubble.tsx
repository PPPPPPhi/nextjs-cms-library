import Dropdown from "react-dropdown"
import { useState, useEffect } from "react"
import "./AdminSiteBubble.css"
import {
    HiChevronDown,
    HiChevronUp,
    HiGlobeAsiaAustralia
} from "react-icons/hi2"

import { siteType } from "@nextjs-cms-library/db-services/index"
import { useParams, useRouter } from "next/navigation"

interface AdminSiteBubbleInterface {
    sites: siteType[]
    isCollapsed: boolean
}

export const AdminSiteBubble: React.FC<AdminSiteBubbleInterface> = ({
    sites,
    isCollapsed
}) => {
    const [options, setOptions] = useState<{ label: string; value: string }[]>()

    const { site } = useParams()
    const router = useRouter()

    useEffect(() => {
        if (sites?.length)
            setOptions(
                sites.map((l) => {
                    return { label: l.name, value: l.slug }
                })
            )
    }, [sites])

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
                        value={(site as string) ?? null}
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
