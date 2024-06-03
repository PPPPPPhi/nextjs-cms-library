import { HiChevronDown, HiChevronUp } from "react-icons/hi"

interface RowCellInterface {
    value: string
    isExpanded: boolean
    customWidth?: number
    action: () => void
}

export const AdminTableCollapse: React.FC<RowCellInterface> = ({
    value,
    customWidth,
    isExpanded,
    action
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
        </div>
    )
}
