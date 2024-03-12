import { useEffect, useState } from "react"
import { AdminTextInput } from "../input"

interface AdminCreateLanguageFormInterface {
    onFormValueChange: (v: string) => void
}

export const AdminCreateLanguageForm: React.FC<
    AdminCreateLanguageFormInterface
> = ({ onFormValueChange }) => {
    const [inputs, setInput] = useState<string>()

    useEffect(() => {
        if (inputs) onFormValueChange(inputs as string)
    }, [inputs])

    return (
        <div className="d-flex flex-column space-y-6 s-section-quaternary p-2">
            <AdminTextInput label="Language" onChange={(v) => setInput(v)} />
        </div>
    )
}
