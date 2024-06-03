import { AdminTableActionButton } from "./AdminTableActionButton"
import { HiEye } from "react-icons/hi"

interface RowCellInterface {
    value: string
    action: () => void
    disabled?: boolean
    customWidth?: number
}

export const AdminTableViewButton: React.FC<RowCellInterface> = ({
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
                    customWidth={80}
                    label="View"
                    // icon={<HiEye className="s-text-color-nu" />}
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
