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
            className="d-flex s-section-primary align-items-center text-font-bold px-2"
            style={{
                minHeight: 35,
                minWidth: customWidth ?? 0,
                maxWidth: customWidth ?? "none"
            }}>
            <span className=" w-100 text-center">{label}</span>
        </div>
    )
}
