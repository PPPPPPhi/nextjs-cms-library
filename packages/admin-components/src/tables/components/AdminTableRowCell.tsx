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
            className="d-flex align-items-center text-font-bold px-2"
            style={{
                minHeight: 35,
                width: customWidth ?? 180
            }}>
            <span
                className="text-font-normal text-level-caption w-100 text-center"
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
