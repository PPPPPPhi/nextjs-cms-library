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
    style?: React.CSSProperties
    inputStyle?: React.CSSProperties
    isShowTime?: boolean
}

export const AdminDatePicker: React.FC<AdminDatePickerInterface> = ({
    label,
    value,
    onChange,
    style,
    isShowTime,
    inputStyle
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
                            onChange(dayjs(v).format("YYYY-MM-DDTHH:mm:ss"))
                        }}
                        sx={{ [".MuiTextField-root input"]: { ...inputStyle } }}
                        slotProps={{
                            textField: {
                                inputProps: {
                                    style: {
                                        ...inputStyle
                                    }
                                }
                            }
                        }}
                    />
                )}
                {isShowTime && (
                    <DateTimePicker
                        label={label}
                        value={dayjs(value)}
                        onChange={(v) => {
                            onChange(dayjs(v).format("YYYY-MM-DDTHH:mm:ss"))
                        }}
                        slotProps={{
                            textField: {
                                inputProps: {
                                    style: {
                                        ...inputStyle
                                    }
                                }
                            }
                        }}
                    />
                )}
            </LocalizationProvider>
        </div>
    )
}
