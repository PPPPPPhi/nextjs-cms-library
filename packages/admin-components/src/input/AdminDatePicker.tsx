import { HiCalendarDays, HiClock } from "react-icons/hi2"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

import dayjs from "dayjs"

interface AdminDatePickerInterface {
    label?: string
    value: Date
    onChange: (d: string) => void
    style: React.CSSProperties
    isShowTime?: boolean
}

export const AdminDatePicker: React.FC<AdminDatePickerInterface> = ({
    label,
    value,
    onChange,
    style,
    isShowTime
}) => {
    return (
        <div
            className="d-flex w-100"
            style={{
                flex: 1,
                height: 70,
                borderRadius: 12,
                background: "white",
                ...style
            }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {!isShowTime && (
                    <DatePicker
                        label={label}
                        value={dayjs(value)}
                        onChange={(v) => {
                            console.log(`date picker`, v)
                            onChange(dayjs(v).format("YYYY-MM-DDTHH:mm:ss"))
                        }}
                    />
                )}
                {isShowTime && (
                    <DateTimePicker
                        label={label}
                        value={dayjs(value)}
                        onChange={(v) => {
                            console.log(`date picker`, v)
                            onChange(dayjs(v).format("YYYY-MM-DDTHH:mm:ss"))
                        }}
                    />
                )}
            </LocalizationProvider>
        </div>
    )
}
