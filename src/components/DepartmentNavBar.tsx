import React, {Dispatch, SetStateAction} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {COLORS} from "../system/colors";

interface DepartmentNavBarProps {
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
    departmentNames: string[]
}

const DepartmentNavBar = (props: DepartmentNavBarProps) => {
    const {value, setValue, departmentNames} = props;
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: COLORS.GREEN, color: COLORS.WHITE }}>
            <Tabs textColor="inherit" value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                {departmentNames.map((departmentName, index) => (
                    <Tab key={index} value={index} label={departmentName} />
                ))}
            </Tabs>
        </Box>
    )
}

export default DepartmentNavBar;
