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
}

export const AdminSiteBubble: React.FC<AdminSiteBubbleInterface> = ({
    sites
}) => {
    const [options, setOptions] = useState<string[]>()

    const { site } = useParams()
    const router = useRouter()

    useEffect(() => {
        if (sites?.length) setOptions(sites.map((l) => l.name))
    }, [sites])

    return (
        <div className="d-flex w-100 p-3" style={{ height: 90 }}>
            <div className="d-flex w-100 s-section-secondary rounded-5 py-2 px-4 align-items-center">
                <HiGlobeAsiaAustralia className="s-text-color-nu" />
                {options && (
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
