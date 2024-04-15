import { useEffect, useState } from "react"
import { AdminTextInput, AdminSelect } from "../input"
import { useAdminAuthorizationContext } from "../../../role-management/src/contexts"
import { set } from "lodash"

interface AdminRoleSwitchingFormInterface {
    onFormValueChange: (v: string) => void
}

export type roleType = {
    sites: string[]
    roleName: string
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
                <div
                    className="d-flex flex-column"
                    onClick={() => setR(l.roleName)}>
                    <div
                        className="d-flex flex-column s-section-quaternary p-2"
                        style={{
                            border:
                                role === l.roleName
                                    ? "2px solid var(--static-color-primary"
                                    : ""
                        }}>
                        <div className="d-flex">
                            <input
                                className="mx-2"
                                type="radio"
                                id="html"
                                checked={r === l.roleName}
                                name="Role_Selection"
                                value={l.roleName}
                                onChange={(evt) => {
                                    // setR(evt.target.value)
                                }}
                            />
                            <span className="text-font-bold">
                                {l.roleName} -{" "}
                            </span>
                            <span className="text-font-light">
                                {l.sites.join(",")}
                            </span>
                        </div>
                        <span
                            className="text-font-light text-level-remark"
                            style={{ paddingLeft: 30 }}>
                            {l.description}
                        </span>
                    </div>

                    <ul style={{ listStyle: "disc", paddingLeft: 50 }}>
                        {l.functions_lookUp.map((k) => (
                            <li>{k.description}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
