import { useState, useEffect } from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

interface AdminRadioButtonInterface {
    groupId: string
    options: string[]
    value: string
    onChange: (r: string) => void
}

export const AdminRadioButton: React.FC<AdminRadioButtonInterface> = ({
    groupId,
    options,
    value,
    onChange
}) => {
    const [r, setR] = useState<string>(value ?? "")

    useEffect(() => {
        onChange(r)
    }, [r])

    return (
        <div>
            <FormControl className="Mui-RadioForm">
                {/* <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                </FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={r}
                    name="radio-buttons-group"
                    onChange={(e) => {
                        setR(e.target.value)
                    }}>
                    <div className="d-flex flex-row">
                        {options.map((l, idx) => (
                            <FormControlLabel
                                className="s-text-color-beta"
                                value={l}
                                control={<Radio />}
                                label={l}
                            />
                        ))}
                    </div>
                </RadioGroup>
            </FormControl>
        </div>
    )
}
