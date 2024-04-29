import DatePicker from "react-datepicker"
import { HiCalendarDays, HiClock } from "react-icons/hi2"

interface AdminDatePickerInterface {
    value: Date
    onChange: (d: Date) => void
    style: React.CSSProperties
    isShowTime?: boolean
}

export const AdminDatePicker: React.FC<AdminDatePickerInterface> = ({
    value,
    onChange,
    style,
    isShowTime
}) => {
    return (
        <div
            className="d-flex w-100 shadow shadow-sm"
            style={{ ...style, height: 38 }}>
            <DatePicker
                showTimeSelect={isShowTime}
                selected={value ?? new Date()}
                onChange={(evt) => {
                    console.log(`date picker`, evt)
                    onChange(evt as Date)
                }} //only when value has changed
            />
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: 80, borderLeft: "1px solid #CFCFCF" }}>
                <HiCalendarDays style={{ width: 24, height: 24 }} />
            </div>
            {isShowTime && (
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: 80, borderLeft: "1px solid #CFCFCF" }}>
                    <HiClock style={{ width: 24, height: 24 }} />
                </div>
            )}
        </div>
    )
}
