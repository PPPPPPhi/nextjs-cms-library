import React, { useState, useEffect, useMemo } from "react"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

interface AdminSelectInterface {
    options: { label: string; value: any }[]
    onSelect: (value: any) => void
    defaultValue?: any
    label?: string
    placeHolder?: string
    remark?: string
    style?: React.CSSProperties
    inputStyle?: React.CSSProperties
    SelectDisplayProps?: React.CSSProperties
}

export const AdminSelect: React.FC<AdminSelectInterface> = ({
    options,
    onSelect,
    defaultValue,
    label,
    placeHolder,
    remark,
    style,
    inputStyle
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(defaultValue)

    useEffect(() => {
        if (
            !defaultValue ||
            defaultValue == selectedOption ||
            typeof defaultValue !== "string"
        )
            return
        setSelectedOption(defaultValue)
    }, [defaultValue])

    useEffect(() => {
        onSelect(selectedOption)
    }, [selectedOption])

    const placeH = useMemo(
        () => placeHolder ?? "Please Select your option",
        [placeHolder]
    )

    return (
        <div className="w-100">
            <FormControl
                sx={{ m: 1, minWidth: 80, background: "white", ...style }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    SelectDisplayProps={{
                        style: {
                            ...inputStyle
                        }
                    }}
                    id="demo-simple-select-autowidth"
                    value={selectedOption ?? ""}
                    placeholder={placeH}
                    onChange={(evt) => setSelectedOption(evt.target.value)}
                    autoWidth
                    inputProps={{
                        style: {
                            ...inputStyle
                        }
                    }}>
                    {options.map((l) => (
                        <MenuItem value={l.value}>
                            <em>{l.label}</em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {remark && (
                <span
                    className="text-level-remark text-font-normal"
                    style={{ fontStyle: "italic" }}>
                    {remark}
                </span>
            )}
        </div>
    )
}
