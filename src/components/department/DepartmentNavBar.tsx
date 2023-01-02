import React, {Dispatch, SetStateAction} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {COLORS} from "../../system/colors";
import AddDepartment from "./AddDepartment";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import EditDepartment from "./EditDepartment";
import DeleteDepartment from "./DeleteDepartment";

interface DepartmentNavBarProps {
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse,
    departmentNames: string[]
}

const DepartmentNavBar = (props: DepartmentNavBarProps) => {
    const {value, setValue, departmentNames, setDepartments, currentDepartment} = props;
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: COLORS.GREEN,
            color: COLORS.WHITE }}>
            {departmentNames.length > 0 && (<Tabs textColor="inherit" value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                {departmentNames.map((departmentName, index) => (
                    <Tab key={index} value={index} label={departmentName} />
                ))}
            </Tabs>)}
            <Tabs textColor="inherit" aria-label="basic tabs example" centered value={value}>
                <AddDepartment setDepartments={setDepartments}/>
                {currentDepartment && (<EditDepartment currentDepartment={currentDepartment} setDepartments={setDepartments} />)}
                {currentDepartment && (<DeleteDepartment currentDepartment={currentDepartment} setDepartments={setDepartments}/>)}
            </Tabs>
        </Box>
    )
}

export default DepartmentNavBar;
