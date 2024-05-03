import { useEffect, useState } from "react"
import { useAdminAuthorizationContext } from "../../../role-management/src/contexts"
import { useCollapse } from "react-collapsed"

interface AdminRoleSwitchingFormInterface {
    onFormValueChange: (v: string) => void
}

export type roleType = {
    sites: string[]
    roleName: string
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
            className="d-flex flex-column"
            {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded)
            })}>
            <div
                className="d-flex flex-column s-section-quaternary p-2"
                style={{
                    border:
                        role === roleName
                            ? "3px solid var(--static-color-primary"
                            : ""
                }}>
                <div className="d-flex">
                    <input
                        className="mx-2"
                        type="radio"
                        id="html"
                        checked={currentRole === roleName}
                        name="Role_Selection"
                        value={roleName}
                        onChange={(evt) => {
                            setCurrentRole(roleName)
                        }}
                    />
                    <span className="text-font-bold text-level-body px-2">
                        {roleName} -
                    </span>
                    <span className="text-font-light text-level-body">
                        {sites.join(",")}
                    </span>
                </div>
                <span
                    className="text-font-light text-level-remark mx-2"
                    style={{ paddingLeft: 30 }}>
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
        console.log("roleList", roleList)
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
