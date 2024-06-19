import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import { AdminTableActionButton } from "./AdminTableActionButton"

interface RowCellInterface {
    value: string
    isExpanded: boolean
    customWidth?: number
    action: () => void
    collapseEdit?: () => void
    collapseRemove?: () => void
}

export const AdminTableCollapse: React.FC<RowCellInterface> = ({
    value,
    customWidth,
    isExpanded,
    action,
    collapseEdit,
    collapseRemove
}) => {
    return (
        <div
            className="d-flex align-items-center cursor-pointer px-3"
            onClick={action}
            style={{
                minHeight: 35,
                maxHeight: 35,
                width: customWidth ?? "auto"
            }}>
            {isExpanded ? (
                <HiChevronUp className="s-text-color-alpha" />
            ) : (
                <HiChevronDown className="s-text-color-alpha" />
            )}
            <span
                className="text-font-bold text-level-caption pl-2"
                style={{ flex: 1 }}>
                {value}
            </span>
            {collapseEdit && (
                <AdminTableActionButton
                    label="Edit"
                    action={() => {
                        console.log("vvvdata")
                        collapseEdit && collapseEdit()
                    }}
                />
            )}
            {collapseRemove && (
                <AdminTableActionButton
                    label="Remove"
                    action={() => {
                        collapseRemove && collapseRemove()
                    }}
                />
            )}
        </div>
    )
}
