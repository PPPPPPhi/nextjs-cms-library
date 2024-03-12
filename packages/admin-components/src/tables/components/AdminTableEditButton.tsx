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
            className="d-flex align-items-center"
            style={{
                minHeight: 35,
                width: customWidth ?? 180
            }}>
            {!disabled && (
                <AdminTableActionButton
                    customWidth={50}
                    icon={<HiPencil className="s-text-color-nu" />}
                    action={action}
                />
            )}
            <span
                className="text-font-bold text-level-caption pl-2"
                style={{ flex: 1 }}>
                {value}
            </span>
        </div>
    )
}
