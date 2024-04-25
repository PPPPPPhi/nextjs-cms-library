import { AdminTableActionButton } from "./AdminTableActionButton"
import { HiPencil } from "react-icons/hi"

interface AdminTableRawEditButtonInterface {
    action: () => void
    disabled?: boolean
    customWidth?: number
}

export const AdminTableRawEditButton: React.FC<
    AdminTableRawEditButtonInterface
> = ({ action, disabled, customWidth }) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: 35,
                width: customWidth ?? "auto"
            }}>
            {!disabled && (
                <AdminTableActionButton
                    customWidth={50}
                    icon={<HiPencil className="s-text-color-nu" />}
                    action={action}
                />
            )}
        </div>
    )
}
