import { useEffect, useState } from "react"
import { useAdminAuthorizationContext } from "../../../role-management/src/contexts"
import { useCollapse } from "react-collapsed"

interface AdminRoleSwitchingFormInterface {
    onFormValueChange: (v: string) => void
}

interface AdminRoleCardInterface {
    sites: string[]
    roleName: string
    description: string
    functions: {
        description: string
    }[]
    currentRole: string
    setCurrentRole: (r: string) => void
}
const AdminRoleCard: React.FC<AdminRoleCardInterface> = ({
    roleName,
    sites,
    functions,
    description,
    currentRole,
    setCurrentRole
}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const { role } = useAdminAuthorizationContext()

    return (
        <div
            className="d-flex flex-column justify-content-center"
            {...getToggleProps({
                onClick: () => {
                    setCurrentRole(roleName)
                    setExpanded((prevExpanded) => !prevExpanded)
                }
            })}>
            <div
                className="d-flex flex-column s-section-quaternary p-3 justify-content-center"
                style={{
                    height: 110,
                    borderRadius: 12,
                    border:
                        currentRole === roleName
                            ? "3px solid var(--static-color-primary)"
                            : "3px solid var(--static-color-text-gamma)"
                }}>
                <div className="d-flex space-x-2">
                    <span
                        className={`text-font-bold text-level-headline px-2 ${role === roleName || currentRole === roleName ? "s-text-color-beta" : "s-text-color-gamma"}`}>
                        {roleName} -
                    </span>
                    <span
                        className={`text-font-medium text-level-headline ${role === roleName || currentRole === roleName ? "s-text-color-beta" : "s-text-color-gamma"}`}>
                        {sites.join(", ")}
                    </span>
                    {role === roleName && (
                        <span
                            className="s-section-secondary s-text-color-nu"
                            style={{
                                borderRadius: 15,
                                padding: "0px 10px",
                                lineHeight: "30px",
                                height: 30
                            }}>
                            Current
                        </span>
                    )}
                </div>
                <span
                    className={`text-font-normal text-level-body mx-2 ${role === roleName || currentRole === roleName ? "s-text-color-beta" : "s-text-color-gamma"}`}>
                    {description}
                </span>
            </div>

            <section className="d-flex flex-wrap px-4" {...getCollapseProps()}>
                {functions.map((k) => (
                    <li className="col-4">{k.description}</li>
                ))}
            </section>
        </div>
    )
}

export const AdminRoleSwitchingForm: React.FC<
    AdminRoleSwitchingFormInterface
> = ({ onFormValueChange }) => {
    const [r, setR] = useState<string>("")

    const { roleList, role } = useAdminAuthorizationContext()

    useEffect(() => {
        if (!role && roleList.length) setR(roleList[0]?.roleName ?? "")
    }, [roleList])

    useEffect(() => {
        if (r) onFormValueChange(r)
    }, [r])

    useEffect(() => {
        if (role && !r) setR(role)
    }, [role])

    return (
        <div className="d-flex flex-column space-y-6 p-2">
            {roleList.map((l) => (
                <AdminRoleCard
                    roleName={l.roleName}
                    sites={l.sites}
                    description={l.description}
                    functions={l.functions_lookUp}
                    currentRole={r}
                    setCurrentRole={setR}
                />
            ))}
        </div>
    )
}
