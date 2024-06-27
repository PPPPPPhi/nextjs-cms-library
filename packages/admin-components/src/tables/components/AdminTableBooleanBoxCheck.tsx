import { HiCheck, HiXMark } from "react-icons/hi2"
import { useState } from "react"
import { AdminCheckboxInput } from "../../input/AdminCheckboxInput"

interface RowBooleanButtonInterface {
    value: boolean
    action: () => void
    customWidth?: number
}

export const AdminTableBooleanBoxCheck: React.FC<RowBooleanButtonInterface> = ({
    value,
    action,
    customWidth
}) => {
    const [trigger, setTrigger] = useState<boolean>(!value)
    return (
        <div
            className="d-flex align-items-center justify-content-center text-font-bold px-2"
            style={{
                minHeight: 35,
                width: customWidth ?? "auto"
            }}>
            <AdminCheckboxInput
                defaultValue={trigger}
                onChange={() => {
                    action()
                    setTrigger(!trigger)
                }}
            />
        </div>
    )
}
