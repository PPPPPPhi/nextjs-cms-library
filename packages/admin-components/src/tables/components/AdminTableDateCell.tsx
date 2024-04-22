import moment from "moment"

interface RowCellInterface {
    value: string
    format?: string
    customWidth?: number
}

export const AdminTableDateCell: React.FC<RowCellInterface> = ({
    value,
    format = "YYYY-MM-DD HH:mm:ss",
    customWidth
}) => {
    return (
        <div
            className="d-flex align-items-center text-font-bold px-2 "
            style={{
                minHeight: 35,
                width: customWidth ?? "auto"
            }}>
            <span className="text-font-normal text-level-caption w-100 text-center">
                {value && moment(value).format(format)}
            </span>
        </div>
    )
}
