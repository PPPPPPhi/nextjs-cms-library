import { useCollapse } from "react-collapsed"
import React, { useRef, useMemo, useState } from "react"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import {
    AdminActionButton,
    AdminButton
} from "@nextjs-cms-library/admin-components/index"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

import {
    useAdminContext,
    AdminRoleEditForm
} from "@nextjs-cms-library/admin-components/index"
import { functionType, siteType } from "@nextjs-cms-library/db-services/index"

interface AdminRoleMappingDisplayInterface {
    roles: roleTypeMap[]
    refresh: () => void
    getFunctionOptions: () => Promise<functionTypes[]>
    updateRole: (v: any) => void
}

interface CollapsedInterface {
    role: roleTypeMap
    refresh: () => void
    getFunctionOptions: () => Promise<functionTypes[]>
    updateRole: (v: any) => void
    isEven: boolean
}

interface BadgeInterface {
    site: string
}

type functionTypes = {
    functionId: string
    name: string
    description: string
}

export type roleTypeMap = {
    _id: string
    roleName: string
    sites: string[]
    description: string
    functions_lookUp: functionTypes[] | functionType[]
}

const Badge: React.FC<BadgeInterface> = ({ site }) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center rounded-4 s-text-color-nu text-level-content text-font-medium px-2 mx-1 my-1 s-section-secondary"
            style={{ height: 30, minWidth: 45 }}>
            <span className="text-level-remark">{site}</span>
        </div>
    )
}

const Collapsed: React.FC<CollapsedInterface> = ({
    role,
    getFunctionOptions,
    updateRole,
    isEven
}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const { roleName, description, functions_lookUp, sites } = role
    const isAllSite = useMemo(() => sites.includes("*"), [sites])
    const { setModal } = useAdminContext()
    const formRef = useRef<any>()

    const editRole = () => {
        setModal({
            title: "Edit Role",
            content: (
                <AdminRoleEditForm
                    onFormValueChange={(v) => {
                        formRef.current = v
                    }}
                    //@ts-ignore
                    getFunctionOptions={getFunctionOptions}
                    //@ts-ignore
                    role={role}
                />
            ),
            confirmCTAText: "Confirm",
            cancelCTAText: "Cancel",
            confirmHandler: () => {
                updateRole(formRef.current)
            },
            pannelWidth: 75,
            pannelHeight: 75
        })
    }

    return (
        <div
            className="d-flex w-100 flex-column"
            style={{
                background: isEven
                    ? "var(--static-bg-boundary)"
                    : "var(--static-bg-quaternary)"
            }}>
            <div
                className="d-flex w-100 p-2 px-4 align-items-center border-bottom"
                {...getToggleProps({
                    onClick: () => setExpanded((prevExpanded) => !prevExpanded)
                })}>
                <div className="d-flex flex-wrap" style={{ flex: 1 }}>
                    {isExpanded ? (
                        <FaChevronUp
                            style={{
                                width: 14,
                                height: 14,
                                marginTop: "0.5rem"
                            }}
                        />
                    ) : (
                        <FaChevronDown
                            style={{
                                width: 14,
                                height: 14,
                                marginTop: "0.5rem"
                            }}
                        />
                    )}
                    <span className="s-text-color-beta text-level-caption text-font-bold p-2">
                        {`${roleName}`}
                    </span>
                    <span className="s-text-color-beta text-level-caption text-font-normal p-2">{`- ${description}`}</span>
                    {isAllSite && <Badge site="All" />}
                    {!isAllSite &&
                        (sites as string[]).map((l, idx) => (
                            <Badge key={`badge${idx}`} site={l} />
                        ))}
                    <div style={{ flex: 1 }} />
                </div>
                <AdminActionButton
                    onClick={() => {
                        editRole()
                    }}
                    label={"Edit"}
                    authCode={"EDIT_ROLE"}
                    style={{ minWidth: 60 }}
                />
            </div>
            <section {...getCollapseProps()}>
                {(functions_lookUp as functionTypes[]).map((k, idx) => {
                    return (
                        <div
                            className="d-flex flex-wrap border-bottom p-1 px-5 align-items-center"
                            key={`function_${idx}`}
                            style={{ height: 50 }}>
                            <span className="col-12 col-lg-4 text-font-bold text-level-caption">
                                {k.name}
                            </span>
                            <span className="col-12 col-lg-8 text-font-normal text-level-caption">
                                {k.description}
                            </span>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export const AdminRoleMappingDisplay: React.FC<
    AdminRoleMappingDisplayInterface
> = ({ roles, refresh, getFunctionOptions, updateRole }) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    return (
        <div
            className="d-flex flex-column w-100 s-section-quaternary shadow-sm overflow-hidden overflow-y-auto"
            style={{ borderRadius: 12 }}>
            {(roles ?? []).map((l, idx) => (
                <Collapsed
                    isEven={idx % 2 === 1}
                    key={`collapsed_${idx}`}
                    role={l}
                    refresh={refresh}
                    getFunctionOptions={getFunctionOptions}
                    updateRole={updateRole}
                />
            ))}
        </div>
    )
}
