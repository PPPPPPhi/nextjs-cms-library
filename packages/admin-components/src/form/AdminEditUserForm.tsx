import { useEffect, useState } from "react"
import { AdminTextInput } from "../input"
import { roleType, userType } from "@nextjs-cms-library/db-services/index"

interface AdminEditUserFormInterface {
    onFormValueChange: (v: editUserFormType) => void
    defaultValue?: editUserFormType | Partial<userType>
}

export type editUserFormType = {
    firstName: string
    lastName: string
}

export const AdminEditUserForm: React.FC<AdminEditUserFormInterface> = ({
    onFormValueChange,
    defaultValue
}) => {
    const [inputs, setInput] = useState<
        editUserFormType | Partial<userType | undefined>
    >(defaultValue)

    const handleChange = (field: string, value: string | boolean) => {
        setInput((v) => ({
            ...(v as editUserFormType),
            [field]: value
        }))
    }

    useEffect(() => {
        onFormValueChange({
            ...(inputs as editUserFormType)
        })
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6 s-section-primary p-2 py-4 rounded-2">
            <AdminTextInput
                label="First Name"
                defaultValue={defaultValue?.firstName ?? ""}
                onChange={(v) => handleChange("firstName", v)}
            />
            <AdminTextInput
                label="Last Name"
                defaultValue={defaultValue?.lastName ?? ""}
                onChange={(v) => handleChange("lastName", v)}
            />
        </div>
    )
}
