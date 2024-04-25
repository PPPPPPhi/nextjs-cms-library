import { HiCheck, HiXMark } from "react-icons/hi2"

interface RowBooleanButtonInterface {
    value: boolean
    customWidth?: number
}

export const AdminTableBooleanButton: React.FC<RowBooleanButtonInterface> = ({
    value,
    customWidth
}) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center text-font-bold px-2"
            style={{
                minHeight: 35,
                width: customWidth ?? "auto"
            }}>
            {value && (
                <HiCheck style={{ width: 28, height: 28, color: "green" }} />
            )}
            {!value && (
                <HiXMark style={{ width: 28, height: 28, color: "red" }} />
            )}
        </div>
    )
}
