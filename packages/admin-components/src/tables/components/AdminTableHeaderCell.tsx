interface HeaderCellInterface {
    label: string
    customWidth?: number
}

export const AdminTableHeaderCell: React.FC<HeaderCellInterface> = ({
    label,
    customWidth
}) => {
    return (
        <div
            className="d-flex w-100 align-items-center text-font-bold"
            style={{
                minHeight: 35,
                maxHeight: 35,
                minWidth: customWidth ?? 0,
                maxWidth: customWidth ?? "none"
            }}>
            <span className=" w-100 text-center">{label}</span>
        </div>
    )
}
