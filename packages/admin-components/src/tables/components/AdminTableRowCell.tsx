interface RowCellInterface {
    value: string
    customWidth?: number
}

export const AdminTableRowCell: React.FC<RowCellInterface> = ({
    value,
    customWidth
}) => {
    return (
        <div
            className="d-flex align-items-center px-2"
            style={{
                minHeight: 35,
                width: customWidth ?? "auto"
            }}>
            <span
                className="text-font-normal text-level-caption w-100 text-center s-text-color-beta"
                style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    textOverflow: "ellipsis"
                }}>
                {value}
            </span>
        </div>
    )
}
