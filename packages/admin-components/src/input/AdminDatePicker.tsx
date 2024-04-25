import DatePicker from "react-datepicker"
import { HiCalendarDays } from "react-icons/hi2"

interface AdminDatePickerInterface {
    value: Date
    onChange: (d: Date) => void
    style: React.CSSProperties
}

export const AdminDatePicker: React.FC<AdminDatePickerInterface> = ({
    value,
    onChange,
    style
}) => {
    return (
        <div
            className="d-flex w-100 shadow shadow-sm"
            style={{ ...style, height: 38 }}>
            <DatePicker
                selected={value ?? new Date()}
                onChange={(evt) => {
                    console.log(`date picker`, evt)
                    onChange(evt as Date)
                }} //only when value has changed
            />
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: 80, borderLeft: "1px solid #CFCFCF" }}>
                <HiCalendarDays style={{ width: 28, height: 28 }} />
            </div>
        </div>
    )
}
