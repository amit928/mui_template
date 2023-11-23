import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function MDSelect({ label, required, value, onChange, data, disabled, variant }) {

    const common_color = useSelector(store => store.common.common_color)

    return <FormControl variant={variant ?? "standard"} fullWidth sx={{ minWidth: 120 }}>
        <InputLabel required={required} id="demo-simple-select-standard-label">{label}

        </InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={value}
            onChange={onChange}
            label={label}
            style={{ color: common_color.TEXT_COLOR, height: "44px", paddingRight: "0.75rem" }}
            disabled={disabled ?? false}
            displayEmpty
            inputProps={{ IconComponent: () => <ArrowDropDownIcon /> }}
        >
            {(required == false || required == undefined) && <MenuItem value="">
                <em>Select</em>
            </MenuItem>
            }
            {
                data && data.length > 0 && data.map((item, index) => {
                    return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>

                })
            }
        </Select>
    </FormControl>;
}
