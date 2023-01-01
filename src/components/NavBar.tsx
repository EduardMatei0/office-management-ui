import React, {Dispatch, SetStateAction} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {COLORS} from "../system/colors";

interface NavBarProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

const NavBar = (props: NavBarProps) => {
    const {value, setValue} = props;
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: COLORS.GREEN, color: COLORS.WHITE }}>
        <Tabs textColor="inherit" value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab value="1" label="People" />
            <Tab value="2" label="Departments" />
        </Tabs>
    </Box>
    )
}

export default NavBar;
