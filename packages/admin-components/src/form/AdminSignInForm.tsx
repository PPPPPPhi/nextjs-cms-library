import { useState } from "react"
import { signIn } from "next-auth/react"

import {
    AdminTextInput,
    AdminButton
} from "@nextjs-cms-library/admin-components/index"
import { useRouter } from "next/navigation"

interface AdminSignFormInterface {}

export type loginType = {
    username: string
    password: string
}

export const AdminSignInForm: React.FC<AdminSignFormInterface> = () => {
    const [inputs, setInputs] = useState<loginType>({
        username: "",
        password: ""
    })

    const router = useRouter()

    const handleSubmit = async () => {
        await signIn("credentials", {
            username: inputs.username,
            password: inputs.password,
            callbackUrl: "/admin"
        })
    }

    const handleChange = (name: string, value: string) => {
        setInputs((values) => ({ ...values, [name]: value }))
    }

    return (
        <div className="d-flex align-items-center h-100 flex-column justify-content-center space-y-2">
            <AdminTextInput
                label="Username"
                onChange={(v) => handleChange("username", v)}
            />
            <AdminTextInput
                label="Password"
                type="password"
                onChange={(v) => handleChange("password", v)}
            />
            <div className="d-flex space-x-3 mt-5">
                <AdminButton
                    inverseStyle
                    label="Sign In"
                    style={{ flex: 1 }}
                    onClick={() => handleSubmit()}
                />
                <AdminButton
                    style={{ flex: 1 }}
                    label="Register"
                    onClick={() => {
                        router.push("./register")
                    }}
                />
            </div>
        </div>
    )
}
