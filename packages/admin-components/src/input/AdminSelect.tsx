import React, { useState, useEffect, useMemo } from "react"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuList from "@mui/material/MenuList"
import { v4 as uuid_v4 } from "uuid"

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
    disabled?: boolean
}

export const AdminSelect: React.FC<AdminSelectInterface> = ({
    options,
    onSelect,
    defaultValue,
    label,
    placeHolder,
    remark,
    style,
    inputStyle,
    disabled = false
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(defaultValue)
    const elementId = useMemo(() => uuid_v4(), [])
    const [selectWidth, setSelectWidth] = useState(0)

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

    useEffect(() => {
        if (document.getElementById(elementId)) {
            setSelectWidth(document.getElementById(elementId)!.clientWidth)
        }
    }, [])

    return (
        <div className="w-100" id={elementId}>
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
                    disabled={disabled}
                    inputProps={{
                        style: {
                            ...inputStyle
                        }
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                width: selectWidth ?? 0
                            }
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
