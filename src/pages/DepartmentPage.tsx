import {Box, ThemeProvider} from "@mui/material";
import {theme} from "../system/colors";
import * as React from "react";
import useDepartments from "../hooks/useDepartments";
import DepartmentNavBar from "../components/department/DepartmentNavBar";
import {useState} from "react";
import DepartmentTable from "../components/department/DepartmentTable";
import AddCategory from "../components/category/AddCategory";


const DepartmentPage = () => {
    const [departments, setDepartments] = useDepartments();
    const [value, setValue] = useState(0);
    const departmentNames = departments.map(department => department.name);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{margin: '0 auto'}}>
                <DepartmentNavBar
                    value={value}
                    setValue={setValue}
                    setDepartments={setDepartments}
                    currentDepartment={departments[value]}
                    departmentNames={departmentNames} />
                {departments[value] && (
                    <React.Fragment>
                        <Box sx={{padding: '2rem'}}>
                            <AddCategory setDepartments={setDepartments} currentDepartment={departments[value]}/>
                            <DepartmentTable department={departments[value]} setDepartments={setDepartments} />
                        </Box>
                    </React.Fragment>)}
            </Box>
        </ThemeProvider>
    );
}

export default DepartmentPage;
