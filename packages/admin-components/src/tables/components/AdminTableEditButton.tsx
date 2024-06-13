import { AdminTableActionButton } from "./AdminTableActionButton"
import { HiPencil } from "react-icons/hi"

interface RowCellInterface {
    value: string
    action: () => void
    disabled?: boolean
    customWidth?: number
}

export const AdminTableEditButton: React.FC<RowCellInterface> = ({
    value,
    action,
    disabled,
    customWidth
}) => {
    return (
        <div
            className="d-flex align-items-center px-3"
            style={{
                minHeight: 35,
                maxHeight: 35,
                width: customWidth ?? "auto"
            }}>
            {!disabled && (
                <AdminTableActionButton
                    customWidth={50}
                    label="Edit"
                    action={action}
                />
            )}
            <span
                className="text-font-bold text-level-caption"
                style={{ flex: 1, paddingLeft: 15 }}>
                {value}
            </span>
        </div>
    )
}
