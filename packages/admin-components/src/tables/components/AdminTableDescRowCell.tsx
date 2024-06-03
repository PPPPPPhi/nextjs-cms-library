interface RowCellInterface {
    value: string
    customWidth?: number
}

export const AdminTableDescRowCell: React.FC<RowCellInterface> = ({
    value,
    customWidth
}) => {
    return (
        <div
            className="d-flex align-items-center text-font-bold px-2"
            style={{
                minHeight: 35,
                maxHeight: 35,
                width: customWidth ?? "auto",
                position: "relative",
                display: "inline-block"
            }}>
            <span
                className="text-font-light text-level-remark  w-100 text-center"
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
