import { useEffect, useState } from "react"
import { AdminCheckboxInput, AdminTextInput } from "../input"
import { roleType, userType } from "@nextjs-cms-library/db-services/index"

interface AdminEditUserFormInterface {
    onFormValueChange: (v: editUserFormType) => void
    getRoleList: () => (roleType & { _id: string })[]
    defaultValue?: editUserFormType | Partial<userType>
}

type editUserFormType = {
    firstName: string
    lastName: string
    roleList: boolean
    roles: string[]
}

export const AdminEditUserRoleForm: React.FC<AdminEditUserFormInterface> = ({
    onFormValueChange,
    defaultValue,
    getRoleList
}) => {
    const [inputs, setInput] = useState<
        editUserFormType | Partial<userType | undefined>
    >(defaultValue)

    console.log("defaultValuev", defaultValue)

    const [roles, setRoles] = useState(defaultValue?.roles ?? [])

    const handleChange = (field: string, value: string | boolean) => {
        setInput((v) => ({
            ...(v as editUserFormType),
            [field]: value
        }))
    }

    const [roleList, setRoleList] = useState<(roleType & { _id: string })[]>()

    const getRoleListInfo = async () => {
        const roleResp = await getRoleList()
        console.log("roleResp", roleResp)
        setRoleList(roleResp)
    }

    const handleRoleChange = (v: string) => {
        const rList = [...roles]
        const rIdx = rList.findIndex((l) => l === v)
        if (rIdx > -1) rList.splice(rIdx, 1)
        else rList.push(v)
        setRoles(rList)
    }

    useEffect(() => {
        getRoleListInfo()
    }, [])

    useEffect(() => {
        if (inputs)
            onFormValueChange({
                ...(inputs as editUserFormType),
                roles: [...roles]
            })
    }, [inputs, roles])

    return (
        <div className="d-flex flex-column space-y-6 s-section-primary p-2 py-4 rounded-2">
            <AdminTextInput
                label="First Name"
                defaultValue={defaultValue?.firstName ?? ""}
                onChange={(v) => {}}
                disabled
            />
            <AdminTextInput
                label="First Name"
                defaultValue={defaultValue?.firstName ?? ""}
                onChange={(v) => {}}
                disabled
            />
            <AdminTextInput
                label="Last Name"
                defaultValue={defaultValue?.lastName ?? ""}
                onChange={(v) => {}}
                disabled
            />
            <div className="d-flex flex-column w-100">
                {(roleList ?? []).map((l, idx) => {
                    return (
                        <AdminCheckboxInput
                            key={`admin_check_box_${idx}`}
                            inputLabel={idx === 0 ? "Role(s)" : undefined}
                            label={l.roleName}
                            defaultValue={
                                !!defaultValue?.roles?.find((k) => k === l._id)
                            }
                            onChange={(checked: boolean) => {
                                handleRoleChange(l._id)
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
